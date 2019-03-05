function route(handle, pathname, response, request) {
	console.log("Fixin to route a request for " + pathname);
	if (typeof handle[pathname] === 'function') {
		handle[pathname](response, request);
	}	else {
		console.log("These are not the droids you are looking for.");
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("404 : File Not Found");
		response.end();
		}
}

exports.route = route;
