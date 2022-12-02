require('dotenv').config();
const http = require('http');
const app = require('./src/app');
// create server
const server = http.createServer(app);

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log('server is runing on port ' + port);
});
