let noMatchPrompts = [
    { contentType: 'PlainText', content: "Sorry, which town or city do you want to hear the weather for?" },
    { contentType: 'PlainText', content: "Please say the name of the town or city that you would like to hear the weather forecast for." },
];
let noInputPrompts = [
    { contentType: 'PlainText', content: "Please say the name of the town or city that you would like to hear the weather forecast for." },
    { contentType: 'PlainText', content: "Please say the name of the town or city that you would like to hear the weather forecast for." },
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