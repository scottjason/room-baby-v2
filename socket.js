var state = { rooms: [{ name: 'j', clients: [] }] }

module.exports = (io) => {

  io.on('connection', (socket) => {

    socket.on('createOffer', (data) => {
      var room = state.rooms.filter(roomMatch(data.roomName))
      if (room.length) {
        console.log('room exists', room)
      } else {
        addRoom(data.roomName, socket)
        socket.emit('joinRoom', { isEmpty: true })
      }
    })
  })
}

function roomMatch(roomName) {
  return (room) => {
    return room.name === roomName
  }
}

function addRoom(roomName, client) {
  var room = { name: roomName, client: client }
  state.rooms.push(room)
}
