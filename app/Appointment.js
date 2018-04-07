const Moment = require('moment');
const HTTP = require('./httpModule.js');
const DATE_TIME_DB = "YYYY-MM-DD HH:mm";
const DATE_TIME_USER = "YYYY-MM-DD hh:mm a";
const DATE_FORMAT = "YYYY-MM-DD";
const TIME_24HR = "HH:mm";
const TIME_12HR = "hh:mm a";
const timeZone = "+0530";
const APPLICATION_NAME = "Appointment";
var _createAppointment = function(self) {
		var slots = self.event.request.intent;
		var param = {};
		if(slots.appointmentDate && slots.appointmentTime) {
			param.appointmentFrom = slots.appointmentDate.value + " " + slots.appointmentTime.value;
		} else if(slots.appointmentDate && !slots.appointmentTime) { 
			param.appointmentFrom = slots.appointmentDate.value + " " + Moment().utcOffset(timeZone).format(TIME_24HR);
		} else if(!slots.appointmentDate && slots.appointmentTime) {
			param.appointmentFrom = Moment().utcOffset(timeZone).format(DATE_FORMAT) + " " + slots.appointmentTime;
		} else if(!slots.appointmentDate && !slots.appointmentTime) {
			param.appointmentFrom =  Moment().utcOffset(timeZone).format(DATE_TIME_DB);
		}
		HTTP.post();
		console.log("current Time ========" + new Date());
		param.appointmentTo = Moment(param.appointmentFrom).add(1, "hours").format(DATE_TIME_DB);
		self.emit(':tell', "Appointment created succesfully at " + param.appointmentFrom + " to " + param.appointmentTo);
		console.log("=========" + Moment().utcOffset("+0530").format("YYYY-MM-DD hh:mm"));
};

module.exports = {
	createAppointment: _createAppointment
};