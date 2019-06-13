const socketFunction = socketServer => {
  const socketIdsToUserIdsMap = {}
  socketServer.on('connect', socket => {
    console.log(`${socket.id} has connected`)
    socketIdsToUserIdsMap[socket.handshake.query.userId] = socket.id

    socket.on('disconnect', () => {
      console.log(`${socket.id} has disconnected`)
      for (let key in socketIdsToUserIdsMap) {
        if (socketIdsToUserIdsMap[key] === socket.id) {
          delete socketIdsToUserIdsMap[key]
          break
        }
      }
    })

    socket.on('sendMessage', (commentObject, emitObject) => {
      const { relatedUsers, stretchTitle, cohortName, studentId } = emitObject

      for (let i = 0; i < relatedUsers.length; ++i) {
        if (socketIdsToUserIdsMap[relatedUsers[i]]) {
          socket
            .to(`${socketIdsToUserIdsMap[relatedUsers[i]]}`)
            .emit(
              'messageSent',
              commentObject,
              stretchTitle,
              cohortName,
              studentId
            )
        }
      }
    })

    socket.on('joinCohortStretchRoom', cohortStretchId => {
      socket.join(cohortStretchId)

      if (cohortStretchId) {
        return socketServer.emit(
          'success',
          `you have joined room for cohort stretch id ${cohortStretchId}`
        )
      } else {
        return socketServer.emit(
          'err',
          `the room for cohort stretch Id ${cohortStretchId} does not exist`
        )
      }
    })

    socket.on('startStretchTimer', cohortStretch => {
      socket.to(cohortStretch.id).emit('timer-started', cohortStretch)
      console.log('received request to start stretch timer')
    })
  })
}

module.exports = socketFunction
