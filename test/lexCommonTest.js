const assert = require('assert');
let common;

describe('Lex Common Test suite', function () {

    beforeEach(function() { 
        // runs once before the first test in this block
        delete require.cache[require.resolve('../lexCommon.js')]  
        common = require('../lexCommon.js');     
        common.errorPrompts.getNoMatchMessage= function(sessionAttributes){
            return { contentType: 'PlainText', content: "test no match 0"};
        }
        common.errorPrompts.getNoInputMessage= function(sessionAttributes){
            return { contentType: 'PlainText', content: "test no input 0"};
        }
      });

    it('should return true if event is invalid', function () {
        event = { 'test': 'value' }
        let resp = common.isEventInvalid(event)
        assert.equal(resp, true);

    });

    it('should return true if event is undefined', function () {

        let resp = common.isEventInvalid(event)
        assert.equal(resp, true);

    });

    it('should return true if event is null', function () {        
        let resp = common.isEventInvalid(null)
        assert.equal(resp, true);

    });

    it('should return false if event is valid', function () {        
        let resp = common.isEventInvalid({"sessionAttributes":{}})
        assert.equal(resp, false);

    });

    it('should return response with slot if built with slotType', function () {
        let slots = [{ 'slot1': 'value' }]
        let expected = {
            dialogAction: {
                type: 'Delegate',
                slots: [{ 'slot1': 'value' }]
            }
        };
        let resp = common.lexResponseBuilder().withSlots(slots).build();
        assert.deepEqual(resp, expected);

    });

    it('should return NM1 for first error with input', function () {
        event = {
            sessionAttributes: {},
            inputTranscript: "invalid utterance"
        }

        let resp = common.errorManager(event).getCodeHookResponse();
        let expected = {
            dialogAction: {
                type: 'ElicitIntent',
                message: {
                    contentType: "PlainText",
                    content: "test no match 0"
                }
            },
            sessionAttributes: {
                allErrorCount: 1,
                maxAttempts: 3,
                noInputCount: 0,
                noMatchCount: 1
            }
        };
        assert.deepStrictEqual(resp, expected, "response is invalid");

    });

    it('should return NI1 for first error with input', function () {
        event = {
            sessionAttributes: {},
        }
        let resp = common.errorManager(event).getCodeHookResponse();
        let expected = {
            dialogAction: {
                type: 'ElicitIntent',
                message: {
                    contentType: "PlainText",
                    content: "test no input 0"
                }
            },
            sessionAttributes: {
                allErrorCount: 1,
                maxAttempts: 3,
                noInputCount: 1,
                noMatchCount: 0
            }
        };
        assert.deepStrictEqual(resp, expected, "response is invalid");

    });

    it('should return final error with input', function () {
        event = {
            sessionAttributes: {
                allErrorCount: 2,
                maxAttempts: 3,
                noInputCount: 1,
                noMatchCount: 1
            },
        }
        let resp = common.errorManager(event).getCodeHookResponse();
        let expected = {
            dialogAction: {
                type: 'Close',
                fulfillmentState: 'Failed'
            }
        };
        assert.deepStrictEqual(resp, expected, "response is invalid");

    });

    [{
        event: {sessionAttributes: {recordedAudio: true}},
        recordAudioEnvValue: false,
        description: 'should return final error if session attribute passes recordedAudio true'
    },
    {
        event: {sessionAttributes: {}},
        recordAudioEnvValue: true,
        description: 'should return final error if env variable recordedAudio true'
    },
    {
        event : {
            sessionAttributes: {
                allErrorCount: 2,
                maxAttempts: 3,
                noInputCount: 1,
                noMatchCount: 1},
        },
        recordAudioEnvValue: false,
        description: 'should return final error after 2 errors'
    }
].forEach(function(testCase) {
        it(testCase.description, function () {
            event = testCase.event;
            process.env.RECORDED_AUDIO= testCase.recordAudioEnvValue;
            let resp = common.errorManager(event).getCodeHookResponse();
            let expected = {
                dialogAction: {
                    type: 'Close',
                    fulfillmentState: 'Failed'
                }
            };
            assert.deepStrictEqual(resp, expected, "response is invalid");
    
        });
    });
    
});