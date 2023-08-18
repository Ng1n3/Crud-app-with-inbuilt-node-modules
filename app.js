const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;

function requestHandler(req, res)  {

    // if(req.url ===)

}

const server = http.createServer(requestHandler);



server.listen(PORT, () => {
    console.log(`You are currently listening on ${HOSTNAME}:${PORT}`);
})