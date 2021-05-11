var mysql = require('mysql')
var sql_params = {
  connectionLimit : 10,
  user            : "site_2843",
  password        : "9FbpvVj4e1hPQg2WOQxBLvKvjv3NpvqzNXhZ3HYUwi2mVAoRwd",
  host            : "director-mysql",
  port            : "3306",
  database        : "site_2843"
}

var pool  = mysql.createPool(sql_params);

module.exports.run_setup = (app) => {
	app.get('/sqlgame', [init, update_last, get_and_display]);
}

function init(req, res, next){
    req.session.redirect_login = '/sqlgame';
    if ('id' in req.session && 'name' in req.session){
        next();
    }
	else {
	    obj = {};
	    obj.name = 'you';
	    obj.highScore = "none, you are not logged in";
	    res.render('sqlGame', obj);
	}
        
}

function update_last(req, res, next){
    if('last' in req.query){
	    update(req.session.id, req.query.last, (err) => {
	        if (err) throw err;
	        next();
	    });
	}
	else next();
}

function get_and_display(req, res, next){
    obj = {};
    obj.name = req.session.name;
    get_high_score(req.session.id, (err, score) => {
	    if (err) throw err;
	    obj.highScore = score;
	    console.log(obj.highScore);
	    res.render('sqlGame', obj);
	});
}

function update(id, score, callback){
    // give this person a new high score
    get_high_score(id, (err, highScore)=>{
        if (err) callback(err);
        high = Math.min(score, highScore); // possible that this is a higher score (which means it is not the high score)
        query = "INSERT INTO sqlgame (id, score) VALUES ("+ id + ", " + high +") ON DUPLICATE KEY UPDATE score = VALUES(score);";

        pool.query(query, function(error, results, fields){
            if (error) return callback(error);
            else callback(null);
        });
    });
      
}
function get_high_score(id, callback) {
    //get the current person's high score
    query = "SELECT score FROM sqlgame WHERE id=" + id;
    pool.query(query, function(error, results, fields) {
        if (error) return callback(error);
        console.log(results);
        console.log(results[0]);
        console.log(results[0].score);
        callback(null, results[0].score); 
    });
}