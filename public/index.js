var routes = require('./routes');
var express = require('express');
var hbs = require('hbs');
var app = express();

//
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
routes.do_setup(app);
var listener = app.listen(process.env.PORT || 8080 , process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started, yay!");
});
