var http = require("http");
var url = require("url");

function start(route, handle) {

	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " recieved");

		route(handle, pathname, response, request);
	}

	http.createServer(onRequest).listen(8888);
	console.log("So it Begins (App listening on port 8888).");

}

exports.start = start;
