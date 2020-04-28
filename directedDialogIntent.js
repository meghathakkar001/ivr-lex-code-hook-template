let validator= require('./validator.js');
let common = require('./lexCommon.js');
const pino = require('pino');
const logger = pino({ level: process.env.LOG_LEVEL || 'error' });

exports.handler = async (event, context) => {
    ;

    logger.debug("Event is " + JSON.stringify(event, null, 2));

    //just return delegate by default    
    let result;

    let isInputValid=validator.validate(event);
    if(!isInputValid){
         result = common.errorManager(event).getCodeHookResponse();
    }else{
        let slots={};
        if(event && event.currentIntent && event.currentIntent.slots){
            slots=event.currentIntent.slot;
        }
        result= common.lexResponseBuilder().withSlots(slots).build();
    }

    logger.debug("Returning " + JSON.stringify(result, null, 2));

    return result;
}

exports.common= common;
exports.validator= validator;
