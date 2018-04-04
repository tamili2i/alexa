module.exports = {
    getListOfPatient: function(intent, callback) {
        var patientType = intent.slots.patientType,
            date = intent.slots.date;
        if(patientType && date) {
            getPatientCountByTypeAndDate(patientType, date, callback);
        }
    },

    getPatientCountByTypeAndDate: function(patientType, date, callback) {
        var speechOut = "34 " + patientType + " have registred " + date;
        callback(speechOut, "", true);
    }
}

// exports.module = patient;