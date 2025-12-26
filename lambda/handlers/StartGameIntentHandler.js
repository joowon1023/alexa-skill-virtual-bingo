const Alexa = require('ask-sdk-core');
const { createNewGame } = require('../utils/gameLogic');
const { saveGameState } = require('../utils/persistence');

const StartGameIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'StartGameIntent';
    },
    async handle(handlerInput) {
        const { requestEnvelope, attributesManager, responseBuilder } = handlerInput;

        // Obtener la velocidad solicitada o usar 'normal' por defecto
        const speed = Alexa.getSlotValue(requestEnvelope, 'speed') || 'normal';

        // Crear nuevo juego
        const gameState = createNewGame(speed);
        await saveGameState(attributesManager, gameState);

        // Mensajes según la velocidad
        const speedMessages = {
            lento: 'modo lento, con 5 segundos entre cada bola',
            normal: 'modo normal, con 3 segundos entre cada bola',
            rápido: 'modo rápido, con un segundo y medio entre cada bola',
            turbo: 'modo turbo, ¡con solo un segundo entre cada bola!'
        };

        const speedMsg = speedMessages[speed] || speedMessages.normal;

        const speakOutput = `<amazon:emotion name="excited" intensity="high">
            ¡Bienvenidos al Virtual Bingo Show!
            <break time="500ms"/>
            Iniciando partida en ${speedMsg}
            <break time="700ms"/>
            ¡Preparen sus cartones! El juego comienza en 3... 2... 1...
            <break time="800ms"/>
            Puedes pausar el juego en cualquier momento diciendo "pausa", 
            o verificar tu cartón diciendo "tengo línea" o "tengo bingo".
            <break time="500ms"/>
            Di "continúa" cuando estés listo para empezar a cantar las bolas.
        </amazon:emotion>`;

        return responseBuilder
            .speak(speakOutput)
            .reprompt('Di "continúa" para empezar a cantar las bolas, o "ayuda" si necesitas información.')
            .getResponse();
    }
};

module.exports = StartGameIntentHandler;
