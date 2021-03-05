var today = new Date(); 
var month_names = [ 'January' , 'February' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September' , 'October' , 'November' , 'December' ];

module.exports.run_setup = (app) => {
    app.get('/first', function(req, res) {
	var obj = {};
	obj.animal = ['dog', 'cat', 'horse']
	obj.rand = Math.floor(1+10*Math.random());
	obj.epoch = Date.now()/1000.0;
	obj.month = month_names[today.getMonth()];
	obj.year = today.getFullYear();
	res.render('first', obj);
    });
};
