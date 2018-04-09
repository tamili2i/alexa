/**
 *
 */

'use strict';
const Alexa = require('alexa-sdk');
const Patient = require('./app/PatientModule.js');
const Appointment = require('./app/Appointment.js');

//console.log('======================', patient);
// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
const handlers = {
    /*"LaunchRequest": 
        welcomeNote(event.request, event.session,function(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                }),*/
    'BookAppointment': function () {
        var self = this;
        Appointment.createAppointment(self);
    }, 
    'LaunchRequest': function() {
        var self = this;
        welcomeNote(this);
    },
    'GetAppointmentList': function() {
        var self = this;
        Appointment.getAppointments(self);
    }
    //"SessionEndedRequest":  sessionEnd()
};

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.appId = process.env.APP_ID; // APP_ID is your skill id which can be found in the Amazon developer console where you create the skill.
    alexa.registerHandlers(handlers);
    alexa.execute();
};


/*function sessionEnd() {
    onSessionEnded(event.request, event.session);
                context.succeed();
}*/
/*exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */
         
//     if (event.session.application.applicationId !== "amzn1.echo-sdk-ams.app.05aecccb3-1461-48fb-a008-822ddrt6b516") {
//         context.fail("Invalid Application ID");
//      }

       /* if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        switch(event.request.type) {
            case "LaunchRequest": 
                welcomeNote(event.request, event.session,function(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
                break;
            case "IntentRequest": 
                onIntent(event.request,event.session,function(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
                break;
            case "SessionEndedRequest":
                onSessionEnded(event.request, event.session);
                context.succeed();
                break;
            default:
                break;
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};*/

/**
 * Called when the session starts.
 */
/*function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // add any session init logic here
}*/

/**
 * Called when the user invokes the skill without specifying what they want.
 */
function welcomeNote(self) {
    console.log("onLaunch requestId=" + launchRequest.requestId
        + ", sessionId=" + session.sessionId);

    var cardTitle = "Ideamed"
    var speechOutput = "Hi, i am ideamed I can create and list appoinments for you."
    //callback(session.attributes,
      //  buildSpeechletResponse(cardTitle, speechOutput, "", true));
    self.emit(":tell", speechOutput);
}

/**
 * Called when the user specifies an intent for this skill.
 */
/*function onIntent(intentRequest, session, callback) {
    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;
    switch(intentName) {
        case "ListOfPatient":
            Patient.getListOfPatient(intent, function(speechOutput, repromptText, sessionEnd) {
                callback(session.attributes,
                    buildSpeechletResponseWithoutCard(speechOutput, repromptText,  sessionEnd));
            });
            break;
        case "BookAppointment";
            Appointment.createAppointment(intent, function(speechOutput, repromptText, sessionEnd) {
                callback(session.attributes,
                    buildSpeechletResponseWithoutCard(speechOutput, repromptText,  sessionEnd));
            });
        default: 
            break;
    }
}*/

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
/*function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // Add any cleanup logic here
}

function handleTestRequest(intent, session, callback) {
    console.log(intent);
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Hello, World!", "eerererer", "true"));
}*/

// ------- Helper functions to build responses -------

/*function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}*/