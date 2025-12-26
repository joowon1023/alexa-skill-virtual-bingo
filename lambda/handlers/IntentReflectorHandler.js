const Alexa = require('ask-sdk-core');

const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `Acabas de activar ${intentName}. Lo siento, no tengo configurado ese comando todavía.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Di "ayuda" para conocer los comandos disponibles.')
            .getResponse();
    }
};

module.exports = IntentReflectorHandler;
