const Alexa = require('ask-sdk-core');
const { SPEED_CONFIG } = require('../data/bingoData');
const { getGameState, saveGameState } = require('../utils/persistence');

const ChangeSpeedIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ChangeSpeedIntent';
    },
    async handle(handlerInput) {
        const { requestEnvelope, attributesManager, responseBuilder } = handlerInput;

        const gameState = await getGameState(attributesManager);

        if (!gameState || !gameState.active) {
            return responseBuilder
                .speak('No hay ninguna partida activa. Di "nueva partida" para comenzar.')
                .reprompt('Di "nueva partida" para comenzar.')
                .getResponse();
        }

        const newSpeed = Alexa.getSlotValue(requestEnvelope, 'speed');

        if (!newSpeed || !SPEED_CONFIG[newSpeed]) {
            return responseBuilder
                .speak('No he entendido la velocidad. Puedes elegir: lento, normal, rápido o turbo.')
                .reprompt('¿A qué velocidad quieres jugar? Lento, normal, rápido o turbo.')
                .getResponse();
        }

        const oldSpeed = gameState.speed;
        gameState.speed = newSpeed;
        await saveGameState(attributesManager, gameState);

        const speedDescriptions = {
            lento: '5 segundos entre cada bola. Perfecto para jugar con calma',
            normal: '3 segundos entre cada bola. El ritmo clásico',
            rápido: 'un segundo y medio entre cada bola. ¡Las cosas se ponen emocionantes!',
            turbo: 'solo un segundo entre cada bola. ¡Modo frenético activado!'
        };

        const speakOutput = `<amazon:emotion name="excited" intensity="medium">
            Velocidad cambiada de ${oldSpeed} a ${newSpeed}.
            <break time="400ms"/>
            Ahora tendrás ${speedDescriptions[newSpeed]}
            <break time="500ms"/>
            Di "continúa" para seguir con el nuevo ritmo.
        </amazon:emotion>`;

        return responseBuilder
            .speak(speakOutput)
            .reprompt('Di "continúa" para seguir jugando con la nueva velocidad.')
            .getResponse();
    }
};

module.exports = ChangeSpeedIntentHandler;
