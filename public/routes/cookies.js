

module.exports.run_setup = app => {
	app.get('/cookie', (req, res) => {
		if ('reset' in req.query || !('visit_count' in req.session)){
			req.session.visit_count = 1;
		}
		else {
			req.session.visit_count++;
		}
		var obj = {'count' : req.session.visit_count};
		res.render('cookie', obj)
	});
}