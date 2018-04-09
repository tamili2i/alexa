const request = require('request');
var options = {
  headers: {
    'Authorization': "Basic c3VwZXJ1c2VyOnN1cGVydXNlcg==",
    'Content-Type': "application/json"
  }
};
var _post = function(path, param, successCallback, errorCallback) {
	options.url = process.env.appUrl + path;
	options.body =  param;
  	options.json =  true;
	request.post(options, function(error, response, body) {
		//console.log("Error ====" + error)
			//console.log("response ====" + JSON.stringify(response))
			//console.log("body ====" + JSON.stringify(body))
		if(error || body.error) {
			errorCallback(body);
		} else {
			successCallback(response, body);
		}
	});
	console.log(process.env.appUrl);
};

module.exports = {
	post: _post
};