const express = require( 'express' );

const app = express();
const port = process.env.PORT || 3000;

app.use( express.static( 'public' ) )

app.get( '/', ( req, res ) => {
    res.sendFile( '/index.html', { root: __dirname } );
});

app.listen( port, () => {
    console.log( `Listening to requests on http://localhost:${port}` );
});
