var config = require('./server/config/config');
var app = require('./server/server');

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);

app.set('ip', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');

app.listen(app.get('port'), app.get('ip'), function() {
  console.log('server running on ' + app.get('ip') + ', port ' + app.get('port'));
});