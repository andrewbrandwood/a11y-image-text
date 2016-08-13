'use strict';

var http = require('http'),
  bodyParser = require('body-parser'),
  express = require('express'),
  exphbs = require('express-handlebars'),
  path = require('path'),
  methodOverride = require('express-method-override'),
  json = require('express-json');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.enable('strict routing');
app.engine('hbs', exphbs({
	extname:'hbs',
	layoutsDir:path.join(__dirname, 'views'),
	defaultLayout:'layout.hbs',
	partialsDir: [path.join(__dirname, 'views/_partials')]
}));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(json());
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./routing')(app);

var port = process.env.PORT || 3001;

module.exports = app;

http.createServer(app).listen(port, function(){
  console.log('Server listening on port ' + port);
});
