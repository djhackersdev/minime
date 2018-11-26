const { Transform } = require('stream')

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

    const magic = this.state.readUInt16LE(0x0000)

    if (magic != 0xA13E) {
      return callback(new Error(`Invalid magic (decimal ${magic})`))
    }

    const len = this.state.readUInt16LE(0x0006)

    if (this.state.length < len) {
      return
    }

    const frame = this.state.slice(0, len)

    console.log('Aimedb: Recv', frame)

    this.state = this.state.slice(len)

    return callback(null, frame)
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

module.exports = {
  Deframer,
  Framer,
}
