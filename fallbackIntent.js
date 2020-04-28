let common= require('./lexCommon.js');
const pino = require('pino');

const logger = pino({ level: process.env.LOG_LEVEL || 'error' });

exports.handler= async (event, context) => {

    logger.debug("Event is " + JSON.stringify(event, null, 2));

    if (common.isEventInvalid(event)) {
        //event is invalid, just return default response
        return common.lexResponseBuilder().withSessionAttributes(event.sessionAttributes).build();
    }

    let result = common.errorManager(event).getCodeHookResponse();

    logger.debug("Returning " + JSON.stringify(result, null, 2));

    return result;
}

exports.common= common;


