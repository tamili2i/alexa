/**
 *
 */

'use strict';
const Alexa = require('alexa-sdk');
const Patient = require('./app/PatientModule.js');
const Appointment = require('./app/Appointment.js');

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
const handlers = {
    'BookAppointment': function () {
        var self = this;
        Appointment.createAppointment(self);
    }, 
    'LaunchRequest': function() {
        var self = this;
        self.emit(":ask", "Hi, Welcome to ideamed, how can I help you?");
    },
    'GetAppointmentList': function() {
        var self = this;
        Appointment.getAppointments(self);
    },
    'AMAZON.HelpIntent': function() {
        self.emit(":ask", "You can ask me to create appointment and know about your appointments.");
    },
    'AMAZON.StopIntent': function() {
        self.emit(":tell", "Good Bye, Take Care");
    }
};

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.appId = process.env.APP_ID; // APP_ID is your skill id which can be found in the Amazon developer console where you create the skill.
    alexa.registerHandlers(handlers);
    alexa.execute();
};

