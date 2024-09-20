//===
// METRÓNOMO
// Author: https://programadorwebvalencia.com/Javascript-ejemplo-metronomo/
//===

document.addEventListener('DOMContentLoaded', function () {

    // Initial state
    const state = {
        playing: false,
        ppm: 120,
        interval: undefined
    };
    
    // Selectors
    const $PpmInput = document.querySelector('#ppm');
    const $playBtn = document.querySelector('#play-btn');
    const $audioSrc = document.querySelector('#audio-metronomo');

    // Events
    $playBtn.addEventListener('click', eventoReproducir);
    $PpmInput.addEventListener('keyup', function() { changeSpeed(this.value) });

    // Inicio
    render(state.ppm, state.playing);


    function setState(field, value) {
        // Validate
        // TODO

        // Change
        state[field] = value;

        return state;
    }

    function getState() {
        return state;
    }


    /**
     * Render
     *
     * @param {number} ppm Pulsaciones por Minuto
     * @param {boolean} isPlay ¿Esta reproduciendose?
     * @return {boolean} Se ha renderizado
     */
    function render(ppm, isPlay) {
        // PPM
        $PpmInput.value = ppm;
        // Text
        $playBtn.classList.toggle('playing', isPlay);
        
        return true;
    }

    /**
     * PlayPause
     *
     * @param {number} ppm Pulsaciones por Minuto
     * @param {HTMLAudioElement} audio
     * @param {boolean} isPlay ¿Esta reproduciendose?
     * @param {intervalID} intervaloActual Intervalo
     * @return {intervalID} Intervalo nuevo
     */
    function playPause(ppm, audio, isPlay, intervaloActual) {
        let miIntervalo;
        // Para intervalo
        clearInterval(intervaloActual);
        // Empieza intervalo nuevo
        if (isPlay) {
            miIntervalo = setInterval(function() {
                // Reproduce audio
                audio.play();
            }, PPMToMiliseconds(ppm));
        }
        return miIntervalo;
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
     * Evento reproduce audio
     *
     * @param {event}
     */
    function eventoReproducir(event) {
        // Inicia o pausa
        state.playing = !state.playing;
        // Reproduce
        state.intervalo = playPause(state.ppm, $audioSrc, state.playing, state.intervalo);
        render(state.ppm, state.playing);
    }


    /**
     * Change speed
     *
     * @param {newSpeed}
     */
    function changeSpeed(newSpeed) {
        state.intervalo = playPause(newSpeed, $audioSrc, state.playing, state.intervalo);
        render(newSpeed, state.playing);
    }


});