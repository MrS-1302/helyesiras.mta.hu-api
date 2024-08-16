const app = require('./app');
const http = require('http');
const conf = require('./conf.json')

process.env.TZ = 'Europe/Budapest';

const http_port = conf.port;

http.createServer(app).listen(http_port, () => {
  console.log(`App listening on port ${http_port}`);
});