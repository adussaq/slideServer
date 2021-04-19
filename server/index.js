(function () {
	"use strict";
	let restify = require('restify');
	const ALLOWED = ["localhost"];

	const respond = function (req, res, next) {
		res.send('hello ' + req.params.id);
		next();
	}

	let server = restify.createServer();
	server.get('/image/:id', respond);
	server.head('/image/:id', respond);

	server.listen(80, function() {
		console.log('%s listening at %s', server.name, server.url);
	});
}())

