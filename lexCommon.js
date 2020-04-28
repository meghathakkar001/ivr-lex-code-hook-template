let errorPrompts= require("./lexErrorPrompts.js");
const pino = require('pino');
const logger = pino({ level: process.env.LOG_LEVEL || 'error' });

isEventInvalid = function (event) {
    if (typeof (event) === undefined || event == null) {
        return true;
    }
    if (typeof (event.sessionAttributes) === undefined || event.sessionAttributes == null) {
        return true;
    }
    return false;
}

errorManager = function (event) {
    let sessionAttributes = event.sessionAttributes;
    let inputTranscript = event.inputTranscript;    
    let recordedAudio = ('true' === process.env.RECORDED_AUDIO);

    if(sessionAttributes.recordedAudio === true){
        recordedAudio = true;
    }
    logger.debug('Environment variable RECORDED_AUDIO: %j', process.env.RECORDED_AUDIO);
    logger.debug('final recordedAudio %j',recordedAudio);

    if (sessionAttributes.maxAttempts === undefined) {
        sessionAttributes.maxAttempts = 3;
    }
    if (sessionAttributes.noMatchCount === undefined) {
        sessionAttributes.noMatchCount = 0;
    }
    if (sessionAttributes.noInputCount === undefined) {
        sessionAttributes.noInputCount = 0;
    }
    if (sessionAttributes.allErrorCount === undefined) {
        sessionAttributes.allErrorCount = 0;
    }
    if(recordedAudio === true){
        sessionAttributes.maxAttempts = 1;
    }
    let errorThreshold = sessionAttributes.maxAttempts - 1;


    let getCodeHookErrorResponse = function () {
        let responseBuilder = lexResponseBuilder();

        logger.debug('session attributes: %j', sessionAttributes);
        logger.debug('errorThreshold: %j', errorThreshold);
        if (sessionAttributes.allErrorCount >= errorThreshold) {
            logger.debug('returning default failed response');
            return responseBuilder.closeWithFulfillmentState("Failed").build();
        }
        
        logger.debug('going ahead with ni nm check');

        sessionAttributes.allErrorCount++;
        if (inputTranscript == null || inputTranscript === '') {
            sessionAttributes.noInputCount++;
            let message = errorPrompts.getNoInputMessage(sessionAttributes.allErrorCount - 1);
            return responseBuilder.withType('ElicitIntent').withMessage(message).withSessionAttributes(sessionAttributes).build();
        }
        /* Now it has to be no match */
        sessionAttributes.noMatchCount++;
        let message = errorPrompts.getNoMatchMessage(sessionAttributes.allErrorCount - 1);
        return responseBuilder.withType('ElicitIntent').withMessage(message).withSessionAttributes(sessionAttributes).build();

    }

    return {
        getCodeHookResponse: getCodeHookErrorResponse
    }



}

lexResponseBuilder = function () {
    let response = {
        dialogAction: {
            type: 'Delegate'
        }
    };

    let withType = function (type) {
        response['dialogAction']['type'] = type;
        return this;
    }

    let closeWithFulfillmentState = function (fulfillmentState) {
        response['dialogAction']['type'] = 'Close';
        response['dialogAction']['fulfillmentState'] = fulfillmentState;
        return this;
    }

    let withSessionAttributes = function (sessionAttributes) {
        response['sessionAttributes'] = sessionAttributes;
        return this;
    }

    let withMessage = function (message) {
        response['dialogAction']['message'] = message;
        return this;
    }

    let withSlots = function(slots){
        response['dialogAction']['slots']=slots;
        return this;
    }

    let build = function () {
        return response;
    }
    return {
        withType: withType,
        withMessage: withMessage,
        build: build,
        closeWithFulfillmentState: closeWithFulfillmentState,
        withSessionAttributes: withSessionAttributes,
        withSlots: withSlots
    }
}

module.exports= {
    errorManager: errorManager,
    isEventInvalid: isEventInvalid,
    lexResponseBuilder: lexResponseBuilder,
    errorPrompts: errorPrompts

}