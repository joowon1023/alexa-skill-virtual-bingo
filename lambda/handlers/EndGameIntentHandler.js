const Alexa = require('ask-sdk-core');
const { getGameState, clearGameState, incrementGamesPlayed } = require('../utils/persistence');

const EndGameIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'EndGameIntent';
    },
    async handle(handlerInput) {
        const { attributesManager, responseBuilder } = handlerInput;

        const gameState = await getGameState(attributesManager);

        if (!gameState || !gameState.active) {
            return responseBuilder
                .speak('No hay ninguna partida activa.')
                .reprompt('Di "nueva partida" para comenzar.')
                .getResponse();
        }

        const ballsCalled = gameState.calledNumbers.length;

        // Actualizar estadísticas
        await incrementGamesPlayed(attributesManager, ballsCalled);

        // Limpiar estado del juego
        await clearGameState(attributesManager);

        const speakOutput = `<amazon:emotion name="excited" intensity="medium">
            Partida finalizada.
            <break time="500ms"/>
        </amazon:emotion>
            Se cantaron ${ballsCalled} ${ballsCalled === 1 ? 'bola' : 'bolas'} en total.
            <break time="400ms"/>
            ¡Gracias por jugar a Virtual Bingo!
            <break time="500ms"/>
            Di "nueva partida" cuando quieras jugar otra vez, 
            o "estadísticas" para ver tu historial de juego.`;

        return responseBuilder
            .speak(speakOutput)
            .reprompt('Di "nueva partida" para jugar otra vez.')
            .getResponse();
    }
};

module.exports = EndGameIntentHandler;
