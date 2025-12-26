const Alexa = require('ask-sdk-core');

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = `Virtual Bingo es tu cantador de bingo personal.
            <break time="500ms"/>
            <amazon:emotion name="excited" intensity="medium">
            ¡Te ayudo a cantar las bolas automáticamente!
            </amazon:emotion>
            <break time="500ms"/>
            Puedes decir:
            <break time="300ms"/>
            "Nueva partida" para empezar en modo normal,
            <break time="200ms"/>
            "Nueva partida rápida" o "nueva partida turbo" para juegos más veloces,
            <break time="200ms"/>
            "Pausa" para detener el juego temporalmente,
            <break time="200ms"/>
            "Continúa" para cantar la siguiente bola,
            <break time="200ms"/>
            "El último número" para repetir la última bola,
            <break time="200ms"/>
            "Histórico" para escuchar los números cantados,
            <break time="200ms"/>
            "Tengo línea" para verificar tu cartón,
            <break time="200ms"/>
            "Cambiar a modo rápido" para ajustar la velocidad durante el juego,
            <break time="200ms"/>
            y "Estadísticas" para ver tu historial.
            <break time="500ms"/>
            ¿Qué te gustaría hacer?`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Di "nueva partida" para comenzar, o pregúntame lo que necesites.')
            .getResponse();
    }
};

module.exports = HelpIntentHandler;
