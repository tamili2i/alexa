const Moment = require('moment');
const HTTP = require('./httpModule.js');
const DATE_TIME_DB = "DD/MM/YYYY HH:mm:ss";
const DATE_TIME_USER = "MMMM, DD YYYY hh:mm a";
const DATE_USER = "MMMM, DD YYYY";
const DATE_FORMAT = "YYYY-MM-DD";
const DATE_FORMAT_LOCAL = "YYYY-MM-DD HH:mm:ss";
const TIME_24HR = "HH:mm";
const TIME_12HR = "hh:mm a";
const timeZone = "+0530";
const APPLICATION_NAME = "Appointment";
const ENV = process.env;
var _createAppointment = function(self) {
		var slots = self.event.request.intent.slots;
		
		var param = {};
		param.name = ENV.name;
		param.sex = ENV.sex;
		param.age = ENV.age;
		if(slots.appointmentDate.value && slots.appointmentTime.value) {
			param.fromTime = slots.appointmentDate.value + " " + slots.appointmentTime.value;
		} else if(slots.appointmentDate.value && !slots.appointmentTime.value) { 
			param.fromTime = slots.appointmentDate.value + " " + Moment().utcOffset(timeZone).format(TIME_24HR);
		} else if(!slots.appointmentDate.value && slots.appointmentTime.value) {
			param.fromTime = Moment().utcOffset(timeZone).format(DATE_FORMAT) + " " + slots.appointmentTime;
		} else if(!slots.appointmentDate.value && !slots.appointmentTime.value) {
			param.fromTime =  Moment().utcOffset(timeZone).format(DATE_TIME_DB);
		}
		var fromTime = Moment(param.fromTime);
		if(Moment().diff(param.fromTime, "hours") < -2) {
			param.fromTime = fromTime.format(DATE_TIME_DB);
			param.toTime = fromTime.add(1, "hours").format(DATE_TIME_DB);
			HTTP.post("services/api/form/Appointment", param, function(response, body) {
				self.emit(':tell', "Appointment has been scheduled on " + Moment(body.fromTime).format(DATE_USER) + " between " + Moment(body.fromTime).format(TIME_12HR) + " and " + Moment(body.toTime).format(TIME_12HR));
			}, function(error) {

			});
		} else {
			self.emit(":ask", "You can't create appointment for past days. Give me future date");
		}
		/*console.log("current Time ========" + new Date());
		
		self.emit(':tell', "Appointment created succesfully at " + param.appointmentFrom + " to " + param.appointmentTo);
		console.log("=========" + Moment().utcOffset("+0530").format("YYYY-MM-DD hh:mm"));*/
};
var _getAppointments = function(self) {
	var slots = self.event.request.intent.slots;
	var param = {};
	param.name = ENV.name;
	param.fromTime = Moment().format(DATE_TIME_DB);
    var url = "services/api/query/GET_FUTURE_APPOINTMENT"
	if(slots.appointmentDate.value) {
		param.fromTime = Moment().format(DATE_FORMAT) + " 00:00:00";
		param.toTime = Moment().format(DATE_FORMAT) + " 23:59:59";
		url = "services/api/query/GET_APPOINTMENT_BY_DATE";
	}

	HTTP.post(url, param, function(response, body) {
		self.emit(':tell', "Appointment has been scheduled on " + Moment(body.fromTime).format(DATE_USER) + " between " + Moment(body.fromTime).format(TIME_12HR) + " and " + Moment(body.toTime).format(TIME_12HR));
	}, function(error) {
				
	});
};

module.exports = {
	createAppointment: _createAppointment
};


//_createAppointment();