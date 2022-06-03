const http = require('http');
const routes = require('./assignmentRoutes')

const server = http.createServer(routes.handler);
server.listen(3000);
