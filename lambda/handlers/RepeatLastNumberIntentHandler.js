const Alexa = require('ask-sdk-core');
const { getGameState } = require('../utils/persistence');

const RepeatLastNumberIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RepeatLastNumberIntent';
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

        if (gameState.lastNumber === null || gameState.calledNumbers.length === 0) {
            return responseBuilder
                .speak('Aún no se ha cantado ningún número. Di "continúa" para empezar.')
                .reprompt('Di "continúa" para cantar la primera bola.')
                .getResponse();
        }

        const { getNumberPhrase } = require('../utils/gameLogic');
        const phrase = getNumberPhrase(gameState.lastNumber);

        const speakOutput = `El último número cantado fue: <break time="300ms"/>
            <amazon:emotion name="excited" intensity="medium">
                ${phrase}
            </amazon:emotion>
            <break time="500ms"/>
            Di "continúa" para la siguiente bola.`;

        return responseBuilder
            .speak(speakOutput)
            .reprompt('Di "continúa" para seguir jugando.')
            .getResponse();
    }
};

module.exports = RepeatLastNumberIntentHandler;
