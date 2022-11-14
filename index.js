const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

var server = http.createServer(handleRequest);
server.listen(port);

console.log('Server running on',hostname,':',port);

function handleRequest(req, res){
	let pathname = req.url;

	if(pathname == '/') {
		pathname = '/index.html';
	}

	let ext = path.extname(pathname);

	const typeExt = {
		'.html': 'text/html',
		'.js':   'text/javascript',
		'.css':  'text/css'
	};

	let contentType = typeExt[ext] || 'text/plain';

	fs.readFile(__dirname + pathname,
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading ' + pathname);
			}
			
			res.writeHead(200,{ 'Content-Type': contentType });
			res.end(data);
		}
	);
}

