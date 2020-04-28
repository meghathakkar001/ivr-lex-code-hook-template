const assert = require('assert');
let errorPrompt;

describe('Error Prompt Test suite', function () {

    beforeEach(function(){
        delete require.cache[require.resolve('../lexErrorPrompts.js')]  
        errorPrompt = require('../lexErrorPrompts.js'); 
    });

    it('should return default prompt ni1', function () {
        sessionAttributes = {allErrorCount: 1 }
        let resp = errorPrompt.getNoInputMessage(sessionAttributes);
        assert.deepEqual(resp, errorPrompt.noInputPrompts[0]);

    });

    it('should return default prompt nm2', function () {
        sessionAttributes = {allErrorCount: 2 }
        let resp = errorPrompt.getNoMatchMessage(sessionAttributes);
        assert.deepEqual(resp, errorPrompt.noMatchPrompts[1]);

    });

    it('should return session prompt ni1Prompt ssml', function () {
        sessionAttributes = {allErrorCount: 1, ni1Prompt: '<speak>unit test ssml ni1</speak>' }
        let resp = errorPrompt.getNoInputMessage(sessionAttributes);
        assert.deepEqual(resp, {content:'<speak>unit test ssml ni1</speak>', contentType:'SSML'});

    });

    it('should return session prompt ni2Prompt text', function () {
        sessionAttributes = {allErrorCount: 2, ni2Prompt: 'unit test ssml ni2' }
        let resp = errorPrompt.getNoInputMessage(sessionAttributes);
        assert.deepEqual(resp, {content:'unit test ssml ni2', contentType:'PlainText'});

    });

    it('should return session prompt nm1Prompt ssml', function () {
        sessionAttributes = {allErrorCount: 1, nm1Prompt: '<speak>unit test ssml nm1</speak>' }
        let resp = errorPrompt.getNoMatchMessage(sessionAttributes);
        assert.deepEqual(resp, {content:'<speak>unit test ssml nm1</speak>', contentType:'SSML'});

    });

    it('should return session prompt nm2Prompt text', function () {
        sessionAttributes = {allErrorCount: 2, nm2Prompt: 'unit test ssml nm2' }
        let resp = errorPrompt.getNoMatchMessage(sessionAttributes);
        assert.deepEqual(resp, {content:'unit test ssml nm2', contentType:'PlainText'});
	});


    
});