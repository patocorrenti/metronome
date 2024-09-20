//===
// METRÓNOMO
// Author: https://programadorwebvalencia.com/Javascript-ejemplo-metronomo/
//===

document.addEventListener('DOMContentLoaded', function () {
;
    // Initial state
    const state = {
        playing: false,
        ppm: 120,
        interval: {}
    };
    
    // Selectors
    const $PpmInput = document.querySelector('#ppm');
    const $playBtn = document.querySelector('#play-btn');
    const $audioSrc = document.querySelector('#audio-source');

    // Events
    $playBtn.addEventListener('click', eventPlayPause);
    $PpmInput.addEventListener('keyup', function() { changeSpeed(this.value) });

    // Init
    render()

    function setState(key, value) {
        // Validate
        // TODO

        // Change
        state[key] = value;

        return state;
    }

    function getState(key) {
        return state[key];
    }


    /**
     * Render
     *
     */
    function render() {
        // PPM
        $PpmInput.value = getState('ppm');
        // Text
        $playBtn.classList.toggle('playing', getState('playing'));
        
        return true;
    }

    /**
     * PlayPause
     *
     */
    function playPause() {
        const audio = $audioSrc;
        let interval = {};
        
        // Stop the interval
        clearInterval( getState('interval') );

        // Starts a new interval
        if (getState('playing')) {
            interval = setInterval(function() {
                // Reproduces the audio
                audio.play();
            }, PPM2Milisec( getState('ppm') ));
        }

        setState('interval', interval);
    }

    /**
     * Transforms PPMs to miliseconds
     *
     * @param {number} ppm
     * @return {number} Milesimas
     */
    function PPM2Milisec(ppm) {
        return (60 / ppm) * 1000;
    }

    /**
     * Event - Toggles play pause
     *
     */
    function eventPlayPause() {
        setState('playing', !getState('playing'));
        playPause();
        render();
    }


    /**
     * Change speed
     *
     * @param {newSpeed}
     */
    function changeSpeed(newSpeed) {
        setState('ppm', newSpeed);
        playPause();
        render();
    }


});