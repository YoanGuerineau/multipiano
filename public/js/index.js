const socket = io.connect(`http://${window.location.hostname}`, {path: '/multipiano/socket.io'});
const createRoomID = document.getElementById("create-room-id");
const createRoomButton = document.getElementById("create-room-button");
const roomIDInput = document.getElementById("room-id-input");
const joinRoomButton = document.getElementById("join-room-button");

socket.on( "connect", () => {
	createRoomID.value = socket.id;
	console.log(`socket connected with id: ${createRoomID.value}`);
});

createRoomButton.addEventListener( "click", ( event ) => {
	window.location.replace(`http://${window.location.hostname}/multipiano/create-room/`);
});

joinRoomButton.addEventListener( "click", ( event ) => {
	const inputID = roomIDInput.value;
	if ( inputID ){
		document.location.href += "room/"+inputID
	} else {
		document.location.href += "rooms"
	}
});
