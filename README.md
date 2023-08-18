# Crud-app-with-inbuilt-node-modules
a Simple crud app that allows for the four major request methods;
* GET
* PUT
* POST
* DELETE
Here we are using a .json file as our database.

## Installation
Use this package manager [npm](https://www.npmjs.com/);

```bash
npm install
```
## Usage
const logEvents = require('./logEvent');
const EventEmitter = require('events');
const http = require("http");
const fs = require("fs");
const path = require("path");
const {format} = require('date-fns');
const {v4: uuid} = require('uuid');

## Dependencies
* date-fns - Allows us to format our date easily.
* uuid - Gives us a unique id dynamically.
* nodemon - restarts our appication/server automatically upon changes made in our app.


## Modules
* http - Allows us create a server.
* Event - allow us listen to and register events in our database.
* fs - Allow us to read/access files in our local machine.
* path - Allow for setting paths dynamically 