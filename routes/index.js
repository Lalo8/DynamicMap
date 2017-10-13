var express = require('express');
var router = express.Router();
const Organization = require('../models/organization');

/* GET home page. */
router.get('/', function(req, res, next) {
	Organization.find((error, organizations) => {
		if (error) { next(error); }
    	else {
      		res.render('index', { 
      		apiKey: "AIzaSyAADIzhXOJbzOfhryet6qTIr9ZpMH26rq4",
      		organizations });
    	}
	})
  //res.render('index', { title: 'DynamicMap' });
});

module.exports = router;