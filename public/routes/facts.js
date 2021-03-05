module.exports.run_setup = (app) => {
    app.get('/facts', (req, res) => {
	const topic = req.query.topic;
	const num = req.query.num;
	var facts = {
	    'red' : ['dogs are not red', 'cats are not red', 'red is the color of blood', 'green is not red', 'C', 'CCCC', 'CCCCCCCCCCC', 'BBB', 'FF']
	}
	if (topic === null && num===null){
	    var obj = {};
	}
	else if (topic in facts && num >=0){
	    var list = facts[topic];
	    //console.log(list.slice(num), list.slice(0, num));
	    var obj = {
		'facts' : list.slice(0, num),
		'topic' : topic,
		'num' : num,
	    };
	}
	else if (!(topic in facts)){
	    var obj = {'error' : "sorry, we don't have any facts on your topic or it was not provided"};
	}
	else{
	    var obj = {'error' : "sorry, but I don't think you asked for a valid number of facts"};
	}
	res.render('facts', obj);
    });
};
