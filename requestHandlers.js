//Required in earlier testing to run "ls -la" command
//var exec = require("child_process").exec;
var appRoot = process.cwd();
var uID;
var imgPath;

var querystring = require("querystring");
	fs = require("fs");
	formidable = require("formidable");
	shortid = require('shortid');

function start(response) {
	console.log("Request handler 'start' called.");

		var body = '<html>' +
			'<head>' +
			'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
			'</head>' +
			'<body>' +
			'<form action="/upload" enctype="multipart/form-data" method="post">' +
			'<input type="file" name="upload" multiple="multiple">' +
			'<input type="Submit" value="Upload file"/>' +
			'</form>' +
			'</body>' +
			'</html>';


		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(body);
		response.end();
}

function upload(response, request) {
	console.log("Request handler 'upload' called.");
	
	var form = new formidable.IncomingForm();
	console.log("About to parse");

	form.parse(request, function(error, fields, files) {
		console.log("Parsing completed");

		uID = shortid.generate();
		imgPath = appRoot + '/tmp/'+ uID +'.png'

		console.log("UID for uploaded image is: " + uID);
		console.log("The image path is " + imgPath)

		var readStream = fs.createReadStream(files.upload.path);
		var writeStream = fs.createWriteStream(imgPath);

		readStream.pipe(writeStream);		


	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("Recieved image:<br/>");
	response.write("<img src='/show' />")
	response.end ();
	});
}

function show(response) {
	console.log("Request handler 'show' was called.");

	fs.readFile(imgPath, "binary", function(error, file) {
		if (error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "image/png"});
			response.write(file, "binary");
			response.end();
		}
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;