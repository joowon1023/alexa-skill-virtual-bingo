const Alexa = require('ask-sdk-core');

const AboutIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AboutIntent';
    },
    handle(handlerInput) {
        const speakOutput = `<amazon:emotion name="excited" intensity="medium">
            Virtual Bingo es tu cantador de bingo personal para Alexa.
            <break time="500ms"/>
        </amazon:emotion>
            Desarrollado por Jose Alvarez Dev,
            este skill te permite jugar al bingo con tu familia y amigos
            mientras Alexa canta las bolas automáticamente.
            <break time="400ms"/>
            Características destacadas:
            <break time="300ms"/>
            Cuatro velocidades de juego,
            frases tradicionales del bingo español,
            verificación de cartones,
            histórico de números,
            y estadísticas de tus partidas.
            <break time="500ms"/>
            ¡Perfecto para tus reuniones familiares!
            <break time="400ms"/>
            Di "nueva partida" para empezar a jugar.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Di "nueva partida" para comenzar a jugar.')
            .getResponse();
    }
};

module.exports = AboutIntentHandler;
