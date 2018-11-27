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

  static cardId(payload) {
    const luid = payload.slice(0x0020, 0x002A)

    return { luid, ...Decoder.ident(payload) }
  }

  _transform(chunk, encoding, callback) {
    const cmd = chunk.readUInt16LE(0x04)

    switch (cmd) {
      case 0x0005:
        return callback(null, {
          cmd: 'register',
          ...Decoder.cardId(chunk),
        })

      case 0x000B:
        return callback(null, {
          cmd: 'campaign',
          ...Decoder.ident(chunk),
        })

      case 0x000F:
        return callback(null, {
          cmd: 'lookup',
          ...Decoder.cardId(chunk),
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
        return callback(null, {
          cmd: `unknown_${cmd}`,
        })
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

      case 'campaign':
        // Still figuring this out...

        buf = Encoder.init(0x0200)
        buf.writeUInt16LE(0x000C,       0x0004) // cmd code
        buf.writeUInt16LE(chunk.status, 0x0008)

        // Campaign array starts at 0x20
        // Element size is 0xA0

        break

      case 'lookup':
        // -1 aime id means card is not registered
        // register level does not seem to matter

        buf = Encoder.init(0x0130)
        buf.writeUInt16LE(0x0010, 0x0004) // cmd code
        buf.writeUInt16LE(chunk.status, 0x0008)
        buf.writeInt32LE(chunk.aimeId || -1, 0x0020)
        buf.writeUInt8(Encoder.registerLevels[chunk.registerLevel], 0x0024)

        break

      case 'register':
        buf = Encoder.init(0x0030)
        buf.writeUInt16LE(0x0006, 0x0004) // cmd code
        buf.writeUInt16LE(chunk.status, 0x0008)
        buf.writeInt32LE(chunk.aimeId, 0x0020)

        break

      default:
        return callback(new Error(`Unimplemented response: ${cmd}`))
    }

    console.log('Aimedb: Send', buf)

    return callback(null, buf)
  }
}

Encoder.registerLevels = {
  none: 0,
  portal: 1,
  segaid: 2,
}

module.exports = {
  Decoder,
  Encoder,
}
