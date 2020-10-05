const socketIo = require('socket.io');

module.exports = {
    startServer,
};

function startServer({ port }) {
    const io = socketIo(port);

    io.on('connection', (socket) => {
        socket.use((packet, next) => {
            const eventName = packet.shift();

            packet.pop();

            const data = packet || [];

            socket.emit(eventName, data);

            next();
          });
    });

    console.info(`Server is listening at port ${port}!`);
}
