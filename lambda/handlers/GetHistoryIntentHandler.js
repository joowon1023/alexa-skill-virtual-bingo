const Alexa = require('ask-sdk-core');
const { getGameState } = require('../utils/persistence');
const { formatCalledNumbers, getGameStats } = require('../utils/gameLogic');

const GetHistoryIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetHistoryIntent';
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

        if (gameState.calledNumbers.length === 0) {
            return responseBuilder
                .speak('Aún no se ha cantado ningún número.')
                .reprompt('Di "continúa" para empezar.')
                .getResponse();
        }

        const stats = getGameStats(gameState.calledNumbers);
        const numbersText = formatCalledNumbers(gameState.calledNumbers);

        let speakOutput = `Hasta ahora se han cantado ${stats.called} números. 
            <break time="400ms"/>`;

        if (gameState.calledNumbers.length <= 5) {
            speakOutput += `Los números son: ${numbersText}. <break time="500ms"/>`;
        } else {
            speakOutput += `${numbersText}. <break time="500ms"/>`;
        }

        speakOutput += `Quedan ${stats.remaining} números por salir. 
            <break time="400ms"/>
            Di "continúa" para seguir jugando.`;

        return responseBuilder
            .speak(speakOutput)
            .reprompt('Di "continúa" para seguir jugando.')
            .getResponse();
    }
};

module.exports = GetHistoryIntentHandler;
