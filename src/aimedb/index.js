const setup = require('./pipeline')

async function aimedb(socket) {
  console.log('Aimedb: Connection opened')

  const { input, output } = setup(socket)

  try {
    for await (const req of input) {
      console.log('Aimedb: Decode', req)

      const { cmd } = req

      switch (cmd) {
        case 'hello':
          console.log('Aimedb: Hello')
          output.write({ cmd, status: 1 })

          break

        case 'lookup':
          console.log('Aimedb: Mifare lookup', req.luid)
          output.write({ cmd })

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