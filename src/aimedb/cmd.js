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

  _transform(chunk, encoding, callback) {
    const cmd = chunk.readUInt16LE(0x04)

    switch (cmd) {
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

module.exports = {
  Decoder,
  Encoder,
}
