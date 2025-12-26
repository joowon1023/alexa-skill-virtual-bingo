const Alexa = require('ask-sdk-core');
const { getGameState, saveGameState } = require('../utils/persistence');

const PauseIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.PauseIntent';
    },
    async handle(handlerInput) {
        const { attributesManager, responseBuilder } = handlerInput;

        const gameState = await getGameState(attributesManager);

        if (!gameState || !gameState.active) {
            return responseBuilder
                .speak('No hay ninguna partida activa para pausar.')
                .getResponse();
        }

        // Pausar el juego
        gameState.paused = true;
        await saveGameState(attributesManager, gameState);

        const ballsCalled = gameState.calledNumbers.length;
        const lastNumber = gameState.lastNumber;

        const speakOutput = `Partida pausada. 
            Llevamos ${ballsCalled} ${ballsCalled === 1 ? 'bola cantada' : 'bolas cantadas'}.
            ${lastNumber !== null ? `El último número fue el ${lastNumber}.` : ''}
            <break time="300ms"/>
            Di "continúa" cuando quieras reanudar el juego, 
            "histórico" para escuchar los números cantados,
            o "terminar partida" para finalizar.`;

        return responseBuilder
            .speak(speakOutput)
            .reprompt('Di "continúa" para reanudar, "histórico" para ver los números, o "terminar partida".')
            .getResponse();
    }
};

module.exports = PauseIntentHandler;
