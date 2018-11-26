const crypto = require('crypto')
const { Transform, pipeline } = require('stream')

const K = Buffer.from('Copyright(C)SEGA', 'utf8')

class Deframer extends Transform {
  constructor(options) {
    super({
      readableObjectMode: true,
      ...options,
    })

    this.state = Buffer.alloc(0)
  }

  _transform(chunk, encoding, callback) {
    this.state = Buffer.concat([ this.state, chunk ])

    if (this.state.length < 8) {
      return
    }

    const magic = this.state.readUInt16LE(0)

    if (magic != 0xA13E) {
      return callback(new Error(`Invalid magic (decimal ${magic})`))
    }

    const len = this.state.readUInt16LE(6)

    if (this.state.length < len) {
      return
    }

    console.log('Aimedb: Recv', this.state)

    const cmd = this.state.readUInt16LE(4)
    const payload = this.state.slice(8, len)

    this.state = this.state.slice(len)

    return callback(null, { cmd, payload })
  }
}

class Decoder extends Transform {
  constructor(options) {
    super({
      readableObjectMode: true,
      writableObjectMode: true,
      ...options,
    })
  }

  static ident(payload) {
    const gameId = payload.toString('ascii', 2, 6)
    const keychipId = payload.toString('ascii', 12, 23)

    return { gameId, keychipId }
  }

  _transform(chunk, encoding, callback) {
    const { cmd, payload } = chunk

    switch (cmd) {
      case 0x0064:
        return callback(null, {
          cmd: 'hello',
          ...Decoder.ident(payload)
        })

      case 0x0066:
        return callback(null, {
          cmd: 'goodbye',
        })

      default:
        return callback(new Error(`Unknown AimeDB command ${cmd}`))
    }
  }
}

class Encoder extends Transform {
  constructor(options) {
    super({
      readableObjectMode: true,
      writableObjectMode: true,
      ...options,
    })
  }

  _transform(chunk, encoding, callback) {
    console.log('Aimedb: Encode', chunk)

    let payload

    switch (chunk.cmd) {
      case 'hello':
        payload = Buffer.alloc(24)
        payload.writeInt16LE(chunk.status)

        return callback(null, { cmd: 0x0065, payload })

      default:
        return callback(newError(`Unimplemented response: ${cmd}`))
    }
  }
}

class Framer extends Transform {
  constructor(options) {
    super({
      writableObjectMode: true,
      ...options
    })
  }

  _transform(chunk, encoding, callback) {
    const { cmd, payload } = chunk

    // Message size must be rounded up to a multiple of 16

    const len = 8 + payload.length
    const buf = Buffer.alloc((len + 15) & ~15)

    buf.writeUInt16LE(0xA13E, 0) // Magic?
    buf.writeUInt16LE(0x3087, 2) // ???
    buf.writeUInt16LE(cmd, 4)
    buf.writeUInt16LE(buf.length, 6)
    payload.copy(buf, 8)

    console.log('Aimedb: Send', buf)

    callback(null, buf)
  }
}

function setup(socket) {
  const input = pipeline(
    socket,
    crypto
      .createDecipheriv('aes-128-ecb', K, null)
      .setAutoPadding(false),
    new Deframer(),
    new Decoder(),
  )

  const output = new Encoder()

  pipeline(
    output,
    new Framer(),
    crypto
      .createCipheriv('aes-128-ecb', K, null)
      .setAutoPadding(false),
    socket,
  )

  return { input, output }
}

async function aimedb(socket) {
  console.log('Aimedb: Connection opened')

  const { input, output } = setup(socket)

  try {
    for await (const req of input) {
      console.log('Aimedb: Decode', req)

      const { cmd } = req
      let payload

      switch (cmd) {
      case 'hello':
        console.log('Aimedb: Hello')
        output.write({ cmd, status: 1 })

        break

      case 'goodbye':
        console.log('Aimedb: Goodbye')

        break

      default:
        console.log('Aimedb: Handler not implemented!')

        break
      }
    }
  } catch (e) {
    console.log('Aimedb: Connection error:\n', e)
  }

  console.log('Aimedb: Connection closed')
  socket.end()
}

module.exports = aimedb
