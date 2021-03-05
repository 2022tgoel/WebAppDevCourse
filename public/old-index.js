var express = require('express');
var hbs = require('hbs');
var url = require('url');
var app = express();

//
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
    //console . log( 'user landed at page' ) ;
    var obj = {};

    obj.name = 'Tarushii';
    obj.month = 'February';
    obj.year = '2021';

    res.render('index', obj);
});

var today = new Date(); 
var month_names = [ 'January' , 'February' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September' , 'October' , 'November' , 'December' ];

app.get('/first', function(req, res) {
    var obj = {};
    obj.animal = ['dog', 'cat', 'horse']
    obj.rand = Math.floor(1+10*Math.random());
    obj.epoch = Date.now()/1000.0;
    obj.month = month_names[today.getMonth()];
    obj.year = today.getFullYear();
    res.render('first', obj);
});

function showCat(res){
    var obj = {};
    obj.animal = 'CAT';
    obj.url = "https://www.rheumatoidarthritis.org/wp-content/uploads/2018/04/dog-featured.jpg";
    obj.month = month_names[today.getMonth()];
    res.render('animal', obj);
}

function showDog(res){
    var obj = {};
    obj.animal = 'DOG';
    obj.url = "https://gobrandgo.com/wp-content/uploads/2013/10/surprised-cat-eric-hacke.jpg";
    obj.month = month_names[today.getMonth()];
    res.render('animal', obj);
}

function showFish(res){
    var obj = {};
    obj.animal = 'CAT or DOG. You have reached the wrong page.';
    obj.url = "https://www.theschoolrun.com/sites/theschoolrun.com/files/article_images/what_is_a_question_mark.png";
    obj.month = month_names[today.getMonth()];
    res.render('animal', obj);
}

app.get('/cat', function(req, res) {
    showCat(res);
});

app.get('/dog', function(req, res) {
    showDog(res);
});

app.get('/fish', function(req, res){
    var obj = {};
    obj.month = month_names[today.getMonth()];
    res.render('instruct', obj);
});

app.get('/pet', function(req, res) {
    const queryObject = req.query.type;
    console.log(queryObject);
    if (queryObject == 'cat'){
	showCat(res);
    } else if (queryObject =='dog'){
	showDog(res);
    }
    else {
	showFish(res);
    }
});

app.get('/facts', (req, res) => {
    const topic = req.query.topic;
    const num = req.query.num;
    var facts = {
	'red' : ['dogs are not red', 'cats are not red', 'red is the color of blood', 'green is not red', 'C', 'CCCC', 'CCCCCCCCCCC', 'BBB', 'FF']
    }
    var obj = {};
    if (topic == null && num==null){
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

app.get('/:page', (req, res) => {
    var obj = {'msg' : 'sorry, ' + req.params.page + ' does not exist'}
    res.render('error', obj);
});

var listener = app.listen(process.env.PORT || 8080 , process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});
