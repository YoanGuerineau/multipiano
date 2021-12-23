const container = document.getElementById('container');
const notes = ['F3','G3','A3','B3','C4','D4','E4','F4','G4','A4'] // Notes given here must be handled in bindKeys.js

notes.forEach( note => {
    if ( note.includes( 'E' ) || note.includes( 'B' ) ) {
        container.innerHTML += getHTML( note, false );
    } else {
        if ( note !== notes[notes.length-1] ) {
            container.innerHTML += getHTML( note, true );
        } else {
            container.innerHTML += getHTML( note, false );
        }
    }
});


function getHTML(note, hasSharp) {
    stringBuilder = "<div class='key-group'>";
    stringBuilder += `<div id='${note}' class='white'></div>`;
    if ( hasSharp ) {
        sharpNote = note.split('').join('#');
        stringBuilder += `<div id='${sharpNote}' class='black'></div>`;
    }
    stringBuilder += "</div>";
    return stringBuilder;
}
