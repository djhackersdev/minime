const crypto = require('crypto')
const { Transform, pipeline } = require('stream')

const K = Buffer.from('Copyright(C)SEGA', 'utf8')

class Decoder extends Transform {
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

class Encoder extends Transform {
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

async function dispatch(socket) {
  console.log('Aimedb: Connection opened')

  const input = pipeline(
    socket,
    crypto
      .createDecipheriv('aes-128-ecb', K, null)
      .setAutoPadding(false),
    new Decoder(),
  )


  const output = new Encoder()

  pipeline(
    output,
    crypto
      .createCipheriv('aes-128-ecb', K, null)
      .setAutoPadding(false),
    socket,
  )

  try {
    for await (const req of input) {
      let payload

      switch (req.cmd) {
      case 0x0064:
        console.log('Aimedb: Hello')

        payload = Buffer.alloc(24)
        payload.writeInt16LE(0x0001, 0)

        output.write({ cmd: 0x0065, payload })

        break

      case 0x0066:
        console.log('Aimedb: Goodbye')

        break

      default:
        console.log('Aimedb: Unknown command', req.cmd)

        break
      }
    }
  } catch (e) {
    console.log('Aimedb: Connection error:\n', e)
  }

  console.log('Aimedb: Connection closed')
  socket.end()
}

module.exports = dispatch
