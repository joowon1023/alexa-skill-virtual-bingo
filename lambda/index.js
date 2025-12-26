const Alexa = require('ask-sdk-core');
const { S3PersistenceAdapter } = require('ask-sdk-s3-persistence-adapter');

// Handlers
const LaunchRequestHandler = require('./handlers/LaunchRequestHandler');
const StartGameIntentHandler = require('./handlers/StartGameIntentHandler');
const ContinueIntentHandler = require('./handlers/ContinueIntentHandler');
const PauseIntentHandler = require('./handlers/PauseIntentHandler');
const ChangeSpeedIntentHandler = require('./handlers/ChangeSpeedIntentHandler');
const RepeatLastNumberIntentHandler = require('./handlers/RepeatLastNumberIntentHandler');
const GetHistoryIntentHandler = require('./handlers/GetHistoryIntentHandler');
const VerifyCardIntentHandler = require('./handlers/VerifyCardIntentHandler');
const GetStatsIntentHandler = require('./handlers/GetStatsIntentHandler');
const EndGameIntentHandler = require('./handlers/EndGameIntentHandler');
const HelpIntentHandler = require('./handlers/HelpIntentHandler');
const AboutIntentHandler = require('./handlers/AboutIntentHandler');
const CancelAndStopIntentHandler = require('./handlers/CancelAndStopIntentHandler');
const SessionEndedRequestHandler = require('./handlers/SessionEndedRequestHandler');
const IntentReflectorHandler = require('./handlers/IntentReflectorHandler');
const ErrorHandler = require('./handlers/ErrorHandler');

// Persistence Adapter
const persistenceAdapter = new S3PersistenceAdapter({
    bucketName: process.env.S3_PERSISTENCE_BUCKET
});

/**
 * REQUEST INTERCEPTOR
 * Se ejecuta antes de cada request
 */
const RequestInterceptor = {
    async process(handlerInput) {
        console.log(`REQUEST: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};

/**
 * RESPONSE INTERCEPTOR
 * Se ejecuta después de cada response
 */
const ResponseInterceptor = {
    async process(handlerInput, response) {
        console.log(`RESPONSE: ${JSON.stringify(response)}`);
    }
};

/**
 * Lambda Handler
 * Este es el punto de entrada de la función Lambda
 */
exports.handler = Alexa.SkillBuilders.custom()
    .withPersistenceAdapter(persistenceAdapter)
    .addRequestHandlers(
        LaunchRequestHandler,
        StartGameIntentHandler,
        ContinueIntentHandler,
        PauseIntentHandler,
        ChangeSpeedIntentHandler,
        RepeatLastNumberIntentHandler,
        GetHistoryIntentHandler,
        VerifyCardIntentHandler,
        GetStatsIntentHandler,
        EndGameIntentHandler,
        HelpIntentHandler,
        AboutIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler // Debe ser el último handler de intents
    )
    .addErrorHandlers(ErrorHandler)
    .addRequestInterceptors(RequestInterceptor)
    .addResponseInterceptors(ResponseInterceptor)
    .lambda();
