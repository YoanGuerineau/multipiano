import { Key } from '/js/classes/Key.js';

const boundKeys = {}

boundKeys['F3'] = new Key( 'KeyQ', 'F3', 'a', '#cccccc' );
boundKeys['F#3'] = new Key( 'Digit2', 'F#3', '2', '#232323' );
boundKeys['G3'] = new Key( 'KeyW', 'G3', 'z', '#cccccc' );
boundKeys['G#3'] = new Key( 'Digit3', 'G#3', '3', '#232323' );
boundKeys['A3'] = new Key( 'KeyE', 'A3', 'e', '#cccccc' );
boundKeys['A#3'] = new Key( 'Digit4', 'A#3', '4', '#232323' );
boundKeys['B3'] = new Key( 'KeyR', 'B3', 'r', '#cccccc' );

boundKeys['C4'] = new Key( 'KeyT', 'C4', 't', '#cccccc' );
boundKeys['C#4'] = new Key( 'Digit6', 'C#4', '6', '#232323' );
boundKeys['D4'] = new Key( 'KeyY', 'D4', 'y', '#cccccc' );
boundKeys['D#4'] = new Key( 'Digit7', 'D#4', '7', '#232323' );
boundKeys['E4'] = new Key( 'KeyU', 'E4', 'u', '#cccccc' );
boundKeys['F4'] = new Key( 'KeyI', 'F4', 'i', '#cccccc' );
boundKeys['F#4'] = new Key( 'Digit9', 'F#4', '9', '#232323' );
boundKeys['G4'] = new Key( 'KeyO', 'G4', 'o', '#cccccc' );
boundKeys['G#4'] = new Key( 'Digit0', 'G#4', '0', '#232323' );
boundKeys['A4'] = new Key( 'KeyP', 'A4', 'p', '#cccccc' );

// as we cannot export the function in order to use it, we define it manually in the window
window.getKey = function getKey( note ) {
	return boundKeys[note];
}