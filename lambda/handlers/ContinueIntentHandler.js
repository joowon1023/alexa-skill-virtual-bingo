const Alexa = require('ask-sdk-core');
const { drawNumber, createNumberAnnouncement } = require('../utils/gameLogic');
const { getGameState, saveGameState } = require('../utils/persistence');

const ContinueIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.ResumeIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'ContinueIntent');
    },
    async handle(handlerInput) {
        const { attributesManager, responseBuilder } = handlerInput;

        // Obtener estado del juego
        const gameState = await getGameState(attributesManager);

        if (!gameState || !gameState.active) {
            return responseBuilder
                .speak('No hay ninguna partida activa. Di "nueva partida" para comenzar.')
                .reprompt('Di "nueva partida" para comenzar a jugar.')
                .getResponse();
        }

        // Reanudar el juego
        gameState.paused = false;

        // Sacar una nueva bola
        const newNumber = drawNumber(gameState.calledNumbers);

        if (newNumber === null) {
            // Se acabaron los números
            await saveGameState(attributesManager, { ...gameState, active: false });

            return responseBuilder
                .speak(`¡Increíble! Se han cantado todos los números del 0 al 99. 
                    La partida ha terminado. Di "nueva partida" si quieres jugar otra vez.`)
                .reprompt('Di "nueva partida" para jugar otra vez.')
                .getResponse();
        }

        // Actualizar estado
        gameState.calledNumbers.push(newNumber);
        gameState.lastNumber = newNumber;
        await saveGameState(attributesManager, gameState);

        // Crear anuncio del número
        const announcement = createNumberAnnouncement(newNumber, true);
        const ballsRemaining = 100 - gameState.calledNumbers.length;

        let speakOutput = `<amazon:emotion name="excited" intensity="medium">
            ${announcement}!
            <break time="500ms"/>
        </amazon:emotion>`;

        // Añadir información cada 10 bolas
        if (gameState.calledNumbers.length % 10 === 0) {
            speakOutput += `Llevamos ${gameState.calledNumbers.length} bolas cantadas, 
                quedan ${ballsRemaining} por salir. <break time="500ms"/>`;
        }

        // Mensaje al llegar al final
        if (ballsRemaining <= 10 && ballsRemaining > 0) {
            speakOutput += `<amazon:emotion name="excited" intensity="high">
                ¡Atención! Solo quedan ${ballsRemaining} bolas.
            </amazon:emotion> <break time="400ms"/>`;
        }

        speakOutput += `Di "continúa" para la siguiente bola, 
            "pausa" para detener, o "tengo línea" si has completado tu cartón.`;

        return responseBuilder
            .speak(speakOutput)
            .reprompt('Di "continúa" para la siguiente bola.')
            .getResponse();
    }
};

module.exports = ContinueIntentHandler;
