module.exports.run_setup = (app) => {
    app.get('/', function(req, res) {
	//console . log( 'user landed at page' ) ;
	var obj = {};

	obj.name = 'Tarushii';
	obj.month = 'February';
	obj.year = '2021';

	res.render('index', obj);
    });
};