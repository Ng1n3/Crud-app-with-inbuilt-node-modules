const http = require("http");
const path = require("path");
const fs = require("fs");
const EventEmitter = require("events");
const logEvents = require("./logEvent");
const itemsDbPath = path.join(__dirname, "data", "item.json");
const itemsDB = JSON.parse(fs.readFileSync(itemsDbPath, "utf8"));

class Emitter extends EventEmitter {}

const myEmitter = new Emitter();

myEmitter.on("log", (msg, fileName) => logEvents(msg, fileName));

function errorCheck(err, res) {
	if (err) {
		console.log(err);
		myEmitter.emit("log", `${err.name}:\t${err.message}`, "reqLog.txt");
		req.writeHead(400);
		res.end("An error occured");
	}
}

function getAllItems(req, res) {
	fs.readFile(itemsDbPath, "utf8", (err, data) => {
		myEmitter.emit("log", `${req.url}\t${req.method}`, "reqLog.txt");
		errorCheck(err, res);
		res.end(data);
	});
}

function postItems(req, res) {
	const body = [];

	req.on("data", (chunk) => {
		body.push(chunk);
	});

	// console.log('here');
	req.on("end", () => {
		const parsedItem = Buffer.concat(body).toString();
		const newItem = JSON.parse(parsedItem);
		//get item id
		const lastItem = itemsDB[itemsDB.length - 1];
		const lastItemId = lastItem.id;
		newItem.id = lastItemId + 1;

		fs.readFile(itemsDbPath, "utf8", (err, data) => {
			errorCheck(err, res);
			res.end(data);
			const oldItems = JSON.parse(data);
			const allItems = [...oldItems, newItem];

			fs.writeFile(itemsDbPath, JSON.stringify(allItems), (err) => {
				myEmitter.emit("log", `${req.url}\t${req.method}`, "reqLog.txt");
				if (err) {
					console.log(err);
					myEmitter.emit("log", `${err.name}:\t${err.message}`, "reqLog.txt");
					res.writeHead(500);
					res.end(
						JSON.stringify({
							message: "internal server error. Could not save book to database",
						})
					);
				}
				res.end(JSON.stringify(newItem), "new item added");
			});
		});
	});
}

function updateItem(req, res) {
	const body = [];

	req.on("data", (chunk) => {
		body.push(chunk);
	});

	req.on("end", () => {
		const parsedItem = Buffer.concat(body).toString();
		const newItem = JSON.parse(parsedItem);
		const itemId = newItem.id;

		fs.readFile(itemsDbPath, "utf8", (err, item) => {
			errorCheck(err, res);

			const itemObj = JSON.parse(item);

			const itemIndex = itemObj.findIndex((item) => item.id === itemId);

			if (itemIndex === -1) {
				myEmitter.emit("log", `Error, Id not found`, "reqLog.txt");
				res.writeHead(404);
				res.end("item with specified id not found");
				return;
			}

			const updatedItems = { ...itemObj[itemIndex], ...newItem };
			itemObj[itemIndex] = updatedItems;

			fs.writeFile(itemsDbPath, JSON.stringify(itemObj), (err) => {
				myEmitter.emit("log", `${req.url}\t${req.method}`, "reqLog.txt");
				if (err) {
					console.log(err);
					myEmitter.emit("log", `Error, Can't write to file`, "reqLog.txt");
					res.writeHead(500);
					res.end(
						JSON.stringify({
							message: "Internal server Error. Could not write new item",
						})
					);
				}
				res.writeHead(200);
				res.end("Update successful");
			});
		});
	});
}

function deleteItem(req, res) {
    const body = [];

    req.on('data', (chunk) => {
        body.push(chunk);
    })

    req.on('end', () => {
        const parsedItem = Buffer.concat(body).toString();
		const newItem = JSON.parse(parsedItem);
		const itemId = newItem.id;

        fs.readFile(itemsDbPath, 'utf8', (err, item) => {
            errorCheck(err, res);
            const itemObj = JSON.parse(item);
            const itemIndex = itemObj.findIndex((item) => item.id === itemId);

            if(itemIndex === -1) {
                res.writeHead(404);
                res.end('item with id not found');
                return;
            }

            itemObj.splice(itemIndex, 1);


            fs.writeFile(itemsDbPath, JSON.stringify(itemObj), (err) => {
                myEmitter.emit("log", `${req.url}\t${req.method}`, "reqLog.txt");
                if(err) {
                    console.log(err);
                    res.writeHead(500);
                    myEmitter.emit("log", `Error, Can't write to file`, "reqLog.txt");
                    res.end(JSON.stringify({
                        message: 'Internal Server Error. could not write to database'
                    }))
                } 
                res.writeHead(200);
                res.end('deletion successful');
            })
        })
    })
}
module.exports = { getAllItems, postItems, updateItem, deleteItem };
