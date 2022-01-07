export class Key {

    keyCode;
    note;
    tooltip;
    element;
    shape;
    duration;
    noSpam;
    defaultBackground;
    triggerBackground;

    constructor( keyCode, note, tooltip='', triggerBackground='#ff0000', shape='sine', duration=1 ) {
        this.keyCode = keyCode;
        this.note = note;
        this.tooltip = tooltip;
        this.element = document.getElementById( note );
        this.shape = shape;
        this.duration = duration;
        this.noSpam = false;
        this.defaultBackground = this.element.style.background;
        this.triggerBackground = triggerBackground;
        this.setTooltip();
        this.setListeners();
    }

    setTooltip() {
        this.element.innerHTML = '<p>'+this.tooltip+'</p>';
    }

    setListeners() {
        document.addEventListener( 'keydown', ( event ) => {
            if ( event.code === this.keyCode && !this.noSpam ) {
                this.playKey();
            }
        });
        document.addEventListener( 'keyup', ( event ) => {
            if ( event.code === this.keyCode ) {
                this.stopKey();
            }
        });
    }

    playKey() {
        socket.emit( 'playKey', roomID, this.note );
        this.element.style.background = this.triggerBackground;
        playTone( this.note, this.shape, this.duration );
        this.noSpam = true;
    }

    stopKey() {
        socket.emit( 'stopKey', roomID, this.note );
        this.element.style.background = this.defaultBackground;
        this.noSpam = false;
    }

    playReceivedKey() {
        this.element.style.background = this.triggerBackground;
        playTone( this.note, this.shape, this.duration );
        this.noSpam = true;
    }

    stopReceivedKey() {
        this.element.style.background = this.defaultBackground;
        this.noSpam = false;
    }
}
