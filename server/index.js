(function () {
	"use strict";
	let restify = require('restify');
	let DEV = false;
	let fs = require('fs');
	const ALLOWED = ["localhost"];

	const buildError = function (req) {
		return 'unknown combination: ' + 
				JSON.stringify(req.params) + 
				JSON.stringify(req.query);
	};

	const imgRespond = function (req, res, next) {
		fs.readFile('./server/tmpData.json', 'utf8', function(err, data) {
			let content
		    if (err) {
		    	content = err;
		    	console.error(err);
		    } else {
		    	content = JSON.parse(data).find(el => el.id === req.params.id);
		    	if (!content) {
		    		content = buildError(req);
		    	}
		    }
		    res.send(content);
			next(false);
		});
		next(false);
	};

	const listRespond = function (req, res, next) {
		let content;

		res.contentType = 'json';
		fs.readFile('./server/tmpData.json', 'utf8', function(err, data) {
		    if (err) {
		    	content = err;
		    	console.error(err);
		    } else {
		    	content = JSON.parse(data);
		    }
			res.send(content);
			next(false);
		});
	};

	//////////////////////////////////////////////////////////////////
	//                   	 start server 		                    //
	//////////////////////////////////////////////////////////////////	
	let server = restify.createServer();

	//////////////////////////////////////////////////////////////////
	//                    set up data server                        //
	//////////////////////////////////////////////////////////////////
	//redirect typos
	server.get('/list', function (req, res, next) {
		res.redirect('/list/', next);
	});

	//actual data server
	server.use(restify.plugins.queryParser());
	server.get('/image/:id', imgRespond);
	server.get('/list/', listRespond);

	//////////////////////////////////////////////////////////////////
	//	                    set up viewer	                        //
	//////////////////////////////////////////////////////////////////

	// list files in directory
	fs.readdir("./viewer", (err, files) => {
		files.forEach(file => {
			console.log(file);
		});
	});

	//redirect typos
	server.get('/viewer', function (req, res, next) {
		res.redirect('/viewer/', next);
	});
	server.get('/', function (req, res, next) {
		res.redirect('/viewer/', next);
	});
	//Actually serve the files
	if (DEV) {
		//development
		server.get('/viewer/*', restify.plugins.serveStatic({
			directory: "/Users/adussaq/Dropbox/01-code/09-slideServer/viewer/",
    		appendRequestPath: false,
			default: 'index.html'
		}));
	} else {
		//production
		server.get('/viewer/*', restify.plugins.serveStatic({
			directory: '/app/',
			default: 'index.html'
		}));
	}

	//intentionally crash service
	// server.get("/crash", function () {
	// 	throw "terminal error";
	// });

	server.listen(80, function() {
		console.log('%s listening at %s', server.name, server.url);
	});
}())

