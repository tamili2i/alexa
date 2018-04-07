const request = require('request');
var options = {
  headers: {
    'Authorization': process.env.authToken
  }
};
var _post = function(path, param, successCallback, errorCallback) {
	options.url = process.env.appUrl
	console.log(process.env.appUrl);
};

module.exports = {
	post: _post
};