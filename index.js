var config = require('./server/config/config');
var app = require('./server/server');
var port = process.env.PORT || 3000;
app.listen(config.port);
console.log('server running on http://localhost:' + config.port);