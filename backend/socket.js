const { Server } = require('socket.io')
const jwt = require('jsonwebtoken')

let io

const initSocket = (httpServer) => {
    io = new Server(httpServer, {
        cors: { origin: '*' }
    })

    io.on('connection', (socket) => {
        
        const token = socket.handshake.auth?.token
        if (token) {
            try {
                jwt.verify(token, process.env.JWT_SECRET)
                socket.join('staff')
            } catch (err) {
            }
        }

        socket.on('trackOrder', (orderId) => {
            socket.join(`order:${orderId}`)
        })
    })

    return io
}

const getIO = () => {
    if (!io) throw new Error('Socket.io is not initialized')
    return io
}

module.exports = { initSocket, getIO }