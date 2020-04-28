let noMatchPrompts = [
    { contentType: 'PlainText', content: "Sorry, could you please repeat that?" },
    { contentType: 'PlainText', content: "Sorry, could you please repeat that?" },
];
let noInputPrompts = [
    { contentType: 'PlainText', content: "Sorry, could you please repeat that?" },
    { contentType: 'PlainText', content: "Sorry, could you please repeat that?" },
];

exports.getNoInputMessage = function (sessionAttributes) {
    let errorCount=sessionAttributes.allErrorCount -1;
    let noInputPrompt=noInputPrompts[errorCount]
    if(sessionAttributes['ni'+sessionAttributes.allErrorCount+'Prompt']){
        let promptText=sessionAttributes['ni'+sessionAttributes.allErrorCount+'Prompt'];
        noInputPrompt = {
            contentType: promptText.startsWith("<speak>")?'SSML':'PlainText',
            content: promptText
        }
    }

    return noInputPrompt ;
}
exports.getNoMatchMessage = function (sessionAttributes) {
    let errorCount=sessionAttributes.allErrorCount -1;
    let noMatchPrompt=noMatchPrompts[errorCount]
    if(sessionAttributes['nm'+sessionAttributes.allErrorCount+'Prompt']){
        let promptText=sessionAttributes['nm'+sessionAttributes.allErrorCount+'Prompt'];
        noMatchPrompt = {
            contentType: promptText.startsWith("<speak>")?'SSML':'PlainText',
            content: promptText
        }
    }

    return noMatchPrompt ;
}


exports.noMatchPrompts=noMatchPrompts;
exports.noInputPrompts=noInputPrompts;