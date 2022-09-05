const express = require( 'express' );
const http = require( 'http' );
const io = require( 'socket.io' );
const path = require( 'path' );

const app = express();
const server = http.createServer( app );
const socket = io( server, 
    {
        cors: {
            origin: process.env.ACCESS_CONTROL_ALLOW_ORIGIN,
            methods: ['GET', 'POST'],
            transports: ['websocket', 'polling']
        },
        path: '/multipiano/socket.io',
    } );
const port = process.env.PORT || 3000;

app.use( '/multipiano', express.static( 'public' ) );
app.use( express.urlencoded( { extended: true } ) );

app.set( 'views', path.join(__dirname, '/public/views'))
app.set( 'view engine', 'ejs' );

const rooms = { }

app.get( '/multipiano/', ( req, res ) => {
    res.render( 'index', { root: __dirname } );
});

app.get( '/multipiano/rooms', ( req, res ) => {
    res.render( 'rooms', { root: __dirname, rooms: rooms } );
});

app.get( '/multipiano/create-room', ( req, res ) => {
    do { randomID = getRandomID(); } while ( rooms[randomID] );
    rooms[randomID] = { users: [] }
    return res.redirect( '/multipiano/room/'+randomID );
});

app.get( '/multipiano/room/:roomID', ( req, res ) => {
    if ( rooms[req.params.roomID] == null ) {
        return res.redirect( '/multipiano/' );
    }
    res.render( 'multipiano', { root: __dirname, roomID: req.params.roomID } );
});

server.listen( port );

socket.on( 'connection', ( socket ) => {

    socket.on( 'join-room', ( roomID ) => {
        socket.join( roomID );
        rooms[roomID].users[socket.id] = socket.id;
    });

    socket.on( 'disconnect', () => {
        getUserRooms(socket).forEach( ( room ) => {
            delete rooms[room].users[socket.id]
            setTimeout( () => {
                if ( rooms[room] && rooms[room].users && Object.entries( rooms[room].users ).length <= 0 ) {
                    delete rooms[room];
                }
            }, 5000)
        });
    });

    socket.on( 'playKey', ( roomID, note ) => {
        socket.to( roomID ).emit( 'playKey', ( note ) );
    })

    socket.on( 'stopKey', ( roomID, note ) => {
        socket.to( roomID ).emit( 'stopKey', ( note ) );
    })

});

function getUserRooms( socket ) {
    return Object.entries( rooms ).reduce( ( names, [name, room] ) => {
        if ( room.users[socket.id] != null ) { 
            names.push(name);
        }
        return names;
    }, [] );
}

function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}

function getRandomID() {
    return S4() + S4();
}
