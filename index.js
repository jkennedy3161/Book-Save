var app = require('./server/server');
var port = process.env.PORT || 3000;
app.listen(port);
console.log('server running on http://localhost:' + port);