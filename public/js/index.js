const socket = io();
const createRoomID = document.getElementById("create-room-id");
const roomIDInput = document.getElementById("room-id-input");
const joinRoomButton = document.getElementById("join-room-button");

socket.on( "connect", () => {
	createRoomID.value = socket.id;
});

joinRoomButton.addEventListener( "click", ( event ) => {
	const inputID = roomIDInput.value;
	if ( inputID ){
		document.location.href += "room/"+inputID
	} else {
		document.location.href += "rooms"
	}
});
