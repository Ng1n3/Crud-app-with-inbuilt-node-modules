const http = require("http");
const fs = require("fs");
const path = require("path");
const { getAllItems, postItems, updateItem, deleteItem} = require("./controller");
const logEvents = require('./logEvent');
const EventEmitter = require('events');


class Emitter extends EventEmitter {}

const myEmitter = new Emitter();

const PORT = process.env.PORT || 5000;
const HOSTNAME = "localhost";

myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName))
const itemsDbPath = path.join(__dirname, "data", "item.json");

function requestHandler(req, res) {
    if (req.url === "/item" && req.method === "GET") {
		getAllItems(req, res);
	} else if (req.url === "/item" && req.method === "POST") {
		postItems(req, res);
	} else if (req.url === "/item" && req.method === "PUT") {
		updateItem(req, res);
	} else if (req.url === "/item" && req.method === "DELETE") {
		deleteItem(req, res);
	} else if(req.url !== '/item'){
        myEmitter.emit('log', `Url Error`, 'reqLog.txt');
        res.writeHead(404)
        res.end('Uable to locate your page :(');
    }
}

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
    itemsDB = JSON.parse(fs.readFileSync(itemsDbPath, "utf8"));
	console.log(`You are currently listening on ${HOSTNAME}:${PORT}`);
});
