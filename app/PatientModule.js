var getListOfPatient = function(intent, callback) {
    var patientType = intent.slots.patientType,
        date = intent.slots.date;
    if(patientType && date) {
        getPatientCountByTypeAndDate(patientType, date, callback);
    }
}

var getPatientCountByTypeAndDate = function(patientType, date, callback) {
    var speechOut = "34 " + patientType + " have registred " + date;
    callback(speechOut, "", true);
}