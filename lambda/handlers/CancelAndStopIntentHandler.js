const Alexa = require('ask-sdk-core');
const { clearGameState } = require('../utils/persistence');

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    async handle(handlerInput) {
        const { attributesManager } = handlerInput;

        // Limpiar el juego actual si existe
        await clearGameState(attributesManager);

        const speakOutput = `<amazon:emotion name="excited" intensity="low">
            ¡Hasta pronto! Gracias por jugar a Virtual Bingo.
            <break time="300ms"/>
            Vuelve cuando quieras seguir jugando.
        </amazon:emotion>`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

module.exports = CancelAndStopIntentHandler;
