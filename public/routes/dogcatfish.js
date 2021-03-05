var today = new Date();
var month_names = [ 'January' , 'February' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September' , 'October' , 'November' , 'December' ];

function showCat(){
    var obj = {};
    obj.animal = 'CAT';
    obj.url = "https://www.rheumatoidarthritis.org/wp-content/uploads/2018/04/dog-featured.jpg";
    obj.month = month_names[today.getMonth()];
    return obj;
}

function showDog(){
    var obj = {};
    obj.animal = 'DOG';
    obj.url = "https://gobrandgo.com/wp-content/uploads/2013/10/surprised-cat-eric-hacke.jpg";
    obj.month = month_names[today.getMonth()];
    return obj;
}

function showFish(){
    var obj = {};
    obj.animal = 'CAT or DOG. You have reached the wrong page.';
    obj.url = "https://www.theschoolrun.com/sites/theschoolrun.com/files/article_images/what_is_a_question_mark.png";
    obj.month = month_names[today.getMonth()];
    return obj;
}

module.exports.run_setup = (app) => {
    app.get('/cat', function(req, res) {
    	var obj = showCat();
    	res.render('animal', obj);
    });

    app.get('/dog', function(req, res) {
    	var obj = showDog();
    	res.render('animal', obj);
    });

    app.get('/fish', function(req, res){
        res.render('instruct');
    });
    app.get('/pet', function(req, res) {
        const queryObject = req.query.type;
        console.log(queryObject);
        if (queryObject == 'cat'){
            var obj = showCat();
        } else if (queryObject =='dog'){
            var obj = showDog();
        }
        else {
            var obj = showFish();
        }
        res.render('animal', obj);
    });
}
