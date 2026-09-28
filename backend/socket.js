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
                console.log('socket auth failed:', err.message)
            }
        }

        socket.on('trackOrder', (orderId) => {
            if (typeof orderId === 'string' && /^[a-f\d]{24}$/i.test(orderId)) {
                socket.join(`order:${orderId}`)
            }
        })
    })

    return io
}

const getIO = () => {
    if (!io) throw new Error('Socket.io is not initialized')
    return io
}

const emitTo = (room, event) => {
    try {
        getIO().to(room).emit(event)
    } catch (err) {
        console.error(`socket emit failed (${event}):`, err.message)
    }
}

module.exports = { initSocket, getIO, emitTo }