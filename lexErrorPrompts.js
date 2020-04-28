let noMatchPrompts = [
    { contentType: 'PlainText', content: "Sorry, could you please repeat that?" },
    { contentType: 'PlainText', content: "Sorry, could you please repeat that?" },
];
let noInputPrompts = [
    { contentType: 'PlainText', content: "Sorry, could you please repeat that?" },
    { contentType: 'PlainText', content: "Sorry, could you please repeat that?" },
];

exports.getNoInputMessage = function (error) {
    return noInputPrompts[error];
}
exports.getNoMatchMessage = function (error) {
    return noMatchPrompts[error];
}