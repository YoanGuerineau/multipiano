const express = require( 'express' );
const http = require( 'http' );
const { Server } = require( 'socket.io' );
const path = require( 'path' );

const app = express();
const server = http.createServer( app );
const io = new Server( server );
const port = process.env.PORT || 3000;

app.use( express.static( 'public' ) )
app.use( express.urlencoded( { extended: true } ) );

app.set( 'views', path.join(__dirname, '/public/views'))
app.set( 'view engine', 'ejs' );

const rooms = { }

app.get( '/', ( req, res ) => {
    res.render( 'index', { root: __dirname } );
});

app.get( '/rooms', ( req, res ) => {
    res.render( 'rooms', { root: __dirname, rooms: rooms } );
});

app.post( '/create-room', ( req, res ) => {
    do { randomID = getRandomID(); } while ( rooms[randomID] );
    rooms[randomID] = { users: [] }
    return res.redirect( '/room/'+randomID );
});

app.get( '/room/:roomID', ( req, res ) => {
    if ( rooms[req.params.roomID] == null ) {
        return res.redirect( '/' );
    }
    res.render( 'multipiano', { root: __dirname, roomID: req.params.roomID } );
});

server.listen( port );

io.on( 'connection', ( socket ) => {

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
