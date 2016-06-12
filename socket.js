var state = { rooms: [] }

module.exports = (io) => {

  io.on('connection', (socket) => {
    socket.on('local.req.isCaller', (roomName) => {
      var isEmpty = state.rooms.filter(roomMatch(roomName)).length === 0
      if (isEmpty) {
        addRoom(roomName, socket)
        socket.emit('local.res.isCaller', false)
      } else {
        addClient(roomName, socket)
        socket.emit('local.res.isCaller', true)
      }
    })
    socket.on('local.description', (payload, roomName) => {
      var clients = state.rooms.filter(roomMatch(roomName))[0].clients
      clients.forEach((client) => {
        if (client.id !== socket.id)
          client.emit('remote.description', payload)
      })
    })
    socket.on('local.candidate', (payload, roomName) => {
      var room = state.rooms.filter(roomMatch(roomName))[0]
      console.log('local candidate', payload, room)
    })
  })
}

function roomMatch(roomName) {
  return (room) => {
    return room.name === roomName
  }
}

function addRoom(roomName, client) {
  var room = { name: roomName, clients: [client] }
  state.rooms.push(room)
}

function addClient(roomName, client) {
  state.rooms.filter(roomMatch(roomName))[0].clients.push(client)
}
