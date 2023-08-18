# Crud-app-with-inbuilt-node-modules
A simple CRUD app built with in-built nodejs modules and a few third party packages, that allows for the four major request methods;
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
```javascript
const logEvents = require('./logEvent');
const EventEmitter = require('events');
const http = require("http");
const fs = require("fs");
const path = require("path");
const {format} = require('date-fns');
const {v4: uuid} = require('uuid');
```

## Dependencies
* date-fns - Allows us to format our date easily.
* uuid - Gives us a unique id dynamically.
* nodemon - restarts our appication/server automatically upon changes made in our app.


## Modules
* Http - Allows us create a server.
* Event - allow us listen to and register events in our database.
* FS - Allow us to read/access files in our local machine.
* Path - Allow for setting paths dynamically 