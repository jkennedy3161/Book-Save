var config = require('./server/config/config');
var app = require('./server/server');
var port = process.env.PORT || 3000;
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
app.listen(config.port, server_ip_address, function() {
  console.log('server running on ' + server_ip_address + ', port ' + config.port);
});