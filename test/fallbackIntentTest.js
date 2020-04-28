const assert = require('assert');
let index = require('../fallbackIntent.js');

describe('FallBackIntent Test suite', function () {


    it('if event is invalid, return default builder response', async function () {
        let response ={result: "success"}
        index.common.isEventInvalid = ()=> true;
        index.common.lexResponseBuilder = () => {return {withSessionAttributes: () => {return {build:() => response}}}};
        let resp = await index.handler({});
        assert.equal(resp, response);

    });

    it('if event is valid, return error response', async function () {
        let response ={errorResult: "success"} 
        process.env.LOG_LEVEL= "error";
        index.common.isEventInvalid = ()=> false;
        index.common.errorManager = () => {return {getCodeHookResponse:() => response}}
        let resp = await index.handler({});
        assert.equal(resp, response);

    });

    
    
});