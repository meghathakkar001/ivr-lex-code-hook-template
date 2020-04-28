# ivr-lex-code-hook

Template repository for lex code hooks
Features:
 - Support default no-match, no-input prompts
 - Supports recorded audio mode, returns control to connect in this case to handle no-match, no-input prompts
 - WIP: dynamic no-match, no-input prompts from connect, prompt variants
 - Usage:
    - fallbackIntent.handler: fulfillment code hook for fallback intent for a Directed Dialog Bot
    - directedDialogIntent.handler: Initialization and validation code hook for Directed Dialog Intent in a Directed Dialog Bot


Below environment variables can be set on aws lambda to control the functionality:
- LOG_LEVEL: default: error, valid values: info, debug, warn, error
- recordedAudio: if set to true lex will not be responsible for no-match, no-input handling. This handling will need to be done on connect

## Getting Started

These instructions will let you create custom code for each of Directed Dialog ask states, test your project  create zip file for aws lambda.

### Prerequisites

node
npm

Run below command to get all required dependencies for this project
npm install 

### Modifying the template

Depending on the Directed Dialog bot/intent, you will need to modfiy below 2 files
- validator.js: add any custom validations on the slot values
- lexErrorPrompts.js: this file should contain the default no-match, no-input prompts for this directed dialog intent/bot


## Running the tests
Below command runs the unit tests in test/ folder
> npm test
For getting test coverage, run 
> npm run coverage

## Build zip for AWS

Below command will create zip file for uploading on AWS 
> npm run pack



