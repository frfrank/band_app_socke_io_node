const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand( new Band('Queen'));
bands.addBand( new Band('Bon Jovi'));
bands.addBand( new Band('Metálica'));
bands.addBand( new Band('Héroes del silencio'));
bands.addBand( new Band('Beatles'));


console.log(bands);

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    });

    client.on('saludo', ( payload ) => {
        console.log('Mensaje de saludo', payload);

        io.emit( 'saludo', { lucas: 'Hola que hace' } );

    });

    client.on('emitir-mensaje', payload => {
        console.log("Mensaje Recibido", payload);
        client.broadcast.emit("emitir-mensaje", payload);
        client.broadcast.emit("nuevo-mensaje", payload);
    })



});
