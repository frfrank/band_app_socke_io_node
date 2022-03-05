const { io } = require('../index');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

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



});
