const { Transform } = require('stream')

class Decoder extends Transform {
  constructor(options) {
    super({
      readableObjectMode: true,
      writableObjectMode: true,
      ...options,
    })
  }

  static ident(payload) {
    const gameId    = payload.toString('ascii', 0x000A, 0x000E)
    const keychipId = payload.toString('ascii', 0x0014, 0x001F)

    return { gameId, keychipId }
  }

  static lookup(payload) {
    const luid = payload.slice(0x0020, 0x002A)

    return { luid, ...Decoder.ident(payload) }
  }

  _transform(chunk, encoding, callback) {
    const cmd = chunk.readUInt16LE(0x04)

    switch (cmd) {
      case 0x000F:
        return callback(null, {
          cmd: 'lookup',
          ...Decoder.lookup(chunk),
        })

      case 0x0064:
        return callback(null, {
          cmd: 'hello',
          ...Decoder.ident(chunk)
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

  static init(length) {
    const buf = Buffer.alloc(length)

    buf.writeUInt16LE(0xA13E, 0x0000) // Magic?
    buf.writeUInt16LE(0x3087, 0x0002) // ???
    buf.writeUInt16LE(length, 0x0006)

    return buf
  }

  _transform(chunk, encoding, callback) {
    console.log('Aimedb: Encode', chunk)

    let buf

    switch (chunk.cmd) {
      case 'hello':
        buf = Encoder.init(0x0020)
        buf.writeUInt16LE(0x0065,       0x0004) // cmd code
        buf.writeUInt16LE(chunk.status, 0x0008)

        break

      default:
        return callback(new Error(`Unimplemented response: ${cmd}`))
    }

    console.log('Aimedb: Send', buf)

    return callback(null, buf)
  }
}

module.exports = {
  Decoder,
  Encoder,
}
