const assert = require('assert');
const index = require('../directedDialogIntent.js');

describe('DirectedDialog Test suite', function () {

   [null, {},{currentIntent: {slots: {}}},{currentIntent: {}}].forEach(function(event){
    it('if validator return success, return default builder response', async function () {
        let response ={result: "success"}
        index.validator.validate = ()=> true;
        index.common.lexResponseBuilder = () => {return {withSlots: () => {return {build:() => response }}}};
        let resp = await index.handler(event);
        assert.equal(resp, response);

    });
});

    
    it('if validator returns error, return error response', async function () {
        let response ={errorResult: "success"}
        index.validator.validate = function() {return false};
        index.common.errorManager = () => {return {getCodeHookResponse:() => response}};
        let resp = await index.handler({});
        assert.equal(resp, response);

    });
    
});