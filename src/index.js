const app = require('./app');
const http = require('http');

process.env.TZ = 'Europe/Budapest';

const http_port = 12300;

http.createServer(app).listen(http_port, () => {
  console.log(`App listening on port ${http_port}`);
});