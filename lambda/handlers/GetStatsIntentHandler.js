const Alexa = require('ask-sdk-core');
const { getUserStats } = require('../utils/persistence');

const GetStatsIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetStatsIntent';
    },
    async handle(handlerInput) {
        const { attributesManager, responseBuilder } = handlerInput;

        const stats = await getUserStats(attributesManager);

        if (stats.gamesPlayed === 0) {
            return responseBuilder
                .speak(`Aún no has jugado ninguna partida. 
                    <break time="300ms"/>
                    Di "nueva partida" para empezar tu primera partida de Virtual Bingo.`)
                .reprompt('Di "nueva partida" para comenzar.')
                .getResponse();
        }

        const avgBalls = stats.gamesPlayed > 0
            ? Math.round(stats.totalBallsCalled / stats.gamesPlayed)
            : 0;

        let speakOutput = `<amazon:emotion name="excited" intensity="medium">
            ¡Aquí están tus estadísticas!
            <break time="500ms"/>
        </amazon:emotion>
            Has jugado ${stats.gamesPlayed} ${stats.gamesPlayed === 1 ? 'partida' : 'partidas'}.
            <break time="400ms"/>`;

        if (stats.gamesWon > 0) {
            speakOutput += `Has ganado ${stats.gamesWon} ${stats.gamesWon === 1 ? 'vez' : 'veces'}.
                <break time="400ms"/>`;
        }

        speakOutput += `En total se han cantado ${stats.totalBallsCalled} bolas,
            con un promedio de ${avgBalls} bolas por partida.
            <break time="500ms"/>`;

        if (stats.lastPlayed) {
            speakOutput += `Tu última partida fue ${getDaysAgo(stats.lastPlayed)}.
                <break time="400ms"/>`;
        }

        speakOutput += `Di "nueva partida" para jugar otra vez.`;

        return responseBuilder
            .speak(speakOutput)
            .reprompt('Di "nueva partida" para jugar.')
            .getResponse();
    }
};

function getDaysAgo(dateString) {
    const lastPlayed = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - lastPlayed);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'hoy';
    if (diffDays === 1) return 'ayer';
    return `hace ${diffDays} días`;
}

module.exports = GetStatsIntentHandler;
