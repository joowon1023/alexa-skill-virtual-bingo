const Alexa = require('ask-sdk-core');
const { verifyWinningCard } = require('../utils/gameLogic');
const { getGameState, incrementGamesWon } = require('../utils/persistence');

const VerifyCardIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'VerifyCardIntent';
    },
    async handle(handlerInput) {
        const { attributesManager, responseBuilder } = handlerInput;

        const gameState = await getGameState(attributesManager);

        if (!gameState || !gameState.active) {
            return responseBuilder
                .speak('No hay ninguna partida activa para verificar.')
                .reprompt('Di "nueva partida" para comenzar.')
                .getResponse();
        }

        // En una implementación real, aquí capturarías los números del usuario
        // Por ahora, damos instrucciones
        const ballsCalled = gameState.calledNumbers.length;

        const speakOutput = `<amazon:emotion name="excited" intensity="high">
            ¡Verificación de cartón!
            <break time="500ms"/>
        </amazon:emotion>
            Hasta ahora se han cantado ${ballsCalled} números.
            <break time="400ms"/>
            Para verificar tu cartón, revisa que todos tus números hayan sido cantados.
            <break time="300ms"/>
            Puedes decir "histórico" para escuchar los últimos números,
            o "el último número" para repetir el último cantado.
            <break time="500ms"/>
            Si has completado una línea o bingo completo, 
            ¡felicidades! <amazon:emotion name="excited" intensity="high">¡Eres el ganador!</amazon:emotion>
            <break time="400ms"/>
            Di "terminar partida" si has ganado, o "continúa" para seguir jugando.`;

        return responseBuilder
            .speak(speakOutput)
            .reprompt('Di "continúa" para seguir, "histórico" para ver los números, o "terminar partida" si has ganado.')
            .getResponse();
    }
};

module.exports = VerifyCardIntentHandler;
