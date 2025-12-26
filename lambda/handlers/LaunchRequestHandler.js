const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    async handle(handlerInput) {
        const { attributesManager, responseBuilder } = handlerInput;

        // Obtener estadísticas para personalizar el mensaje
        const { getUserStats } = require('../utils/persistence');
        const stats = await getUserStats(attributesManager);

        let speakOutput = '';

        if (stats.gamesPlayed > 0) {
            speakOutput = `<amazon:emotion name="excited" intensity="high">
                ¡Bienvenido de nuevo a Virtual Bingo!
                <break time="500ms"/>
            </amazon:emotion>
                Has jugado ${stats.gamesPlayed} ${stats.gamesPlayed === 1 ? 'partida' : 'partidas'}.
                <break time="400ms"/>
                Di "nueva partida" para empezar a jugar,
                "nueva partida rápida" para modo acelerado,
                o "estadísticas" para ver tu historial.`;
        } else {
            speakOutput = `<amazon:emotion name="excited" intensity="high">
                ¡Bienvenido a Virtual Bingo!
                <break time="500ms"/>
            </amazon:emotion>
                Tu cantador de bingo personal.
                <break time="600ms"/>
                Puedo cantar las bolas automáticamente con frases tradicionales del bingo español.
                <break time="400ms"/>
                Tienes cuatro velocidades disponibles: lento, normal, rápido y turbo.
                <break time="500ms"/>
                Di "nueva partida" para empezar en modo normal,
                o "nueva partida rápida" si prefieres un juego más dinámico.`;
        }

        return responseBuilder
            .speak(speakOutput)
            .reprompt('Di "nueva partida" para comenzar, o "ayuda" si necesitas más información.')
            .getResponse();
    }
};

module.exports = LaunchRequestHandler;
