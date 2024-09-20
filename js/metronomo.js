//===
// METRÓNOMO
// Author: https://programadorwebvalencia.com/Javascript-ejemplo-metronomo/
//===

document.addEventListener('DOMContentLoaded', function () {

    // Initial state
    const state = {
        playing: false,
        ppm: 120,
        interval: {}
    };
    
    // Selectors
    const $PpmInput = document.querySelector('#ppm');
    const $playBtn = document.querySelector('#play-btn');
    const $audioSrc = document.querySelector('#audio-metronomo');

    // Events
    $playBtn.addEventListener('click', eventPlayPause);
    $PpmInput.addEventListener('keyup', function() { changeSpeed(this.value) });

    // Inicio
    render();


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
     * @param {number} ppm Pulsaciones por Minuto
     * @param {boolean} isPlay ¿Esta reproduciendose?
     * @return {boolean} Se ha renderizado
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
     * @param {number} ppm Pulsaciones por Minuto
     * @param {HTMLAudioElement} audio
     * @param {boolean} isPlay ¿Esta reproduciendose?
     * @return {intervalID} Intervalo nuevo
     */
    function playPause() {
        const audio = $audioSrc;
        let interval = {};
        
        // Para intervalo
        clearInterval( getState('interval') );

        // Empieza intervalo nuevo
        if (getState('playing')) {
            interval = setInterval(function() {
                // Reproduce audio
                audio.play();
            }, PPMToMiliseconds( getState('ppm') ));
        }

        setState('interval', interval);
    }

    /**
     * Transforma los PPM a milesimas
     *
     * @param {number} ppm
     * @return {number} Milesimas
     */
    function PPMToMiliseconds(ppm) {
        return (60 / ppm) * 1000;
    }

    /**
     * Evento reproduce o pausa audio
     *
     */
    function eventPlayPause() {
        setState('playing', !getState('playing'));
        // Reproduce
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