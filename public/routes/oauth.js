const simpleoauth2 = require("simple-oauth2");
const cookieSession = require('cookie-session') ;
const https = require('https');
var hostname = "https://hi.sites.tjhsst.edu"
var ion_client_id = "mYaug2A7rxWiwSroS3OfhyG2Q36o7iFebA3VW4rR";
var ion_client_secret = "X4VX6uhOY0Oz9Lds05vfqjLjutRIKwIaWD7wA50IYcAZg8DxWLZKNeuGCJuta4rHOm7M6NZKY1QCCDXPBQH3l8hA1rSl00ohzgztTPPqnS6LPnPpOFTHUd3XUXgMA3yI";
var ion_redirect_uri =hostname + "/login";

var config = {
    client: {
        id: ion_client_id,
        secret: ion_client_secret
    },
    auth: {
        tokenHost:     'https://ion.tjhsst.edu/oauth/',
        authorizePath: 'https://ion.tjhsst.edu/oauth/authorize',
        tokenPath:     'https://ion.tjhsst.edu/oauth/token/'
    }
};

const { ClientCredentials, ResourceOwnerPassword, AuthorizationCode } = require('simple-oauth2');
    
const client = new AuthorizationCode(config);

var login_url = client.authorizeURL({
    scope: "read", // remove scope: read if you also want write access
    redirect_uri: ion_redirect_uri
});

module.exports.run_setup = (app) => {
	app.get('/login', [get_code, handle_code, get_api_data]);
	app.get('/user', [handle_params, display])
}

function get_code(req, res, next){
    console.log(req.query.code);
	if (!('code' in req.query)){
		res.redirect(login_url);
	}
	else{
		next();
	}

}
async function handle_code(req, res, next){
	var code = req.query.code;
	const tokenParams = {
		code: code,
		redirect_uri: ion_redirect_uri,
		scope : 'read'
	};
	console.log(tokenParams.code);
    try {
    	req.session.accessToken = await client.getToken(tokenParams);
    	console.log(req.session.accessToken);
    	next();
    	
    }
    catch (err){
        console.log(err);
    	obj = {'msg' : 'Access Token Error'}
    	res.render('error', obj);
    }

}

function get_api_data(req, res, next){
	var profile_url = 'https://ion.tjhsst.edu/api/profile?format=json&access_token='+req.session.accessToken.token.access_token;
    console.log(profile_url);
	var options = { headers : { 'User-Agent' : 'request' } } ;
	https.get(profile_url, options, function(response) {
		var rawData = '';
		response.on('data', function(chunk) {
			rawData += chunk;
		});
		response.on('end', function() {
		    try {
		        var obj = JSON.parse(rawData);
    			req.session.name = obj.display_name;
    		    res.redirect(hostname + '/user');
		    }
		    catch (e){
		        console.error(e);
        	    obj = {'msg' : 'Sorry, we could not log you in because there was an issue fetching API data'};
        	    res.render('error', obj);
		    }
			
		});
    
    }).on('error', (e) =>{
        console.error(e);
	    obj = {'msg' : 'Sorry, we could not log you in because there was an issue fetching API data'};
	    res.render('error', obj);
    });
}

function handle_params(req, res, next){
    req.obj = {}
    if ('reset' in req.query || !('ion_count' in req.session)){
		req.session.ion_count = 1;
	}
	else {
	    req.session.ion_count++;
	}
	if ('logout' in req.query){
	    delete req.session.name;
	}
	if (req.session.name !== undefined){
        req.obj.name = req.session.name;
    }
    else req.obj.name = 'you';
    req.obj.count = req.session.ion_count;
    next();

}

function display(req, res, next){
    res.render('user', req.obj);
}
