const http = require("http")
const fss = require('fs').promises;
//const fs = require('fs');
const url = require('url');

const port = 8080;
const host = 'localhost';

let indexFile, indexFile1, indexFile2, indexFile3;

fss.readFile(__dirname + "/file1.html")
	.then(contents => {
	indexFile = contents;
	})
	.catch(err => {
	console.error(`Could not read index.html file: ${err}`);
	process.exit(1);
	});

fss.readFile(__dirname + "/file2.html")
	.then(contents => {
	indexFile1 = contents;
	})
	.catch(err => {
	console.error(`Could not read index.html file: ${err}`);
	process.exit(1);
	});

fss.readFile(__dirname + "/file3.html")
	.then(contents => {
	indexFile2 = contents;
	})
	.catch(err => {
	console.error(`Could not read file3.html file: ${err}`);
	process.exit(1);
	});

fss.readFile(__dirname + "/addname.html")
	.then(contents => {
	indexFile3 = contents;
	})
	.catch(err => {
	console.error(`Could not read addtextbox.html file: ${err}`);
	process.exit(1);
	});

const server = http.createServer((req, res) => {
	if(req.url === '/'){
		res.writeHead(200);
		res.end(indexFile);

	}else if(req.url.startsWith('/route1')){
		const parsedUrl = url.parse(req.url, true);
		const query = parsedUrl.query;
		const textboxValue = query.textbox || 'RAFI';
		
		const modifiedData = indexFile1.toString().replace('{{textboxValue}}', textboxValue);
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(modifiedData);

	}else if(req.url === '/route2'){
			res.writeHead(200);
			res.end(indexFile2);
		
	}else if (req.url === '/addname') {
			res.writeHead(200);
			res.end(indexFile3);
			
	}else{
		res.writeHead(404);
		res.end(JSON.stringify({error:"Resource not found"}));
	}
	
		
});

server.listen(port, host, ()=> {
	console.log(`Server is running on http://${host}:${port}`);
});
