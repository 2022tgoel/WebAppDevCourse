var root = require('./home.js');
var root = require('./home.js');
var first = require('./first.js');
var dogcatfish = require('./dogcatfish.js');
var facts = require('./facts.js');
var apod = require('./apod.js');
var weather = require('./weather.js')
var cookies = require('./cookies.js')
var oauth = require('./oauth.js')
var sqlGame = require('./sql.js')
var cookieSession = require('cookie-session')


module.exports.do_setup = function(app) {

    root.run_setup(app);
    first.run_setup(app);
    dogcatfish.run_setup(app);
    facts.run_setup(app);
    apod.run_setup(app);
    weather.run_setup(app);
    //cookies
    app.use(cookieSession({
        name : 'cookie',
        keys : ['keys']
    }));
    cookies.run_setup(app);
    //oauth
    oauth.run_setup(app);
    sqlGame.run_setup(app);
    app.get('/game', (req, res)=> {
        res.render('game');
    })
    app.get('/:page', (req, res) => {
        var obj = {'msg' : 'sorry, ' + req.params.page + ' does not exist'}
        res.render('error', obj);
    });
};
