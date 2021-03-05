var root = require('./home.js');
var first = require('./first.js');
var dogcatfish = require('./dogcatfish.js');
var facts = require('./facts.js');
module.exports.do_setup = function(app) {
    root.run_setup(app);
    first.run_setup(app);
    dogcatfish.run_setup(app);
    facts.run_setup(app);
    app.get('/:page', (req, res) => {
		var obj = {'msg' : 'sorry, ' + req.params.page + ' does not exist'}
		res.render('error', obj);
    });
};