var express = require('express');
var router  = express.Router();
var db   = require('../models/db');


/* View all users in a <table> */
router.get('/all', function (req, res) {
    db.GetAll(function (err, result) {
            if (err) throw err;
            res.render('displayPlayerTable.ejs', {rs: result});
        }
    );
});


/* Create a User */

// Create User Form
router.get('/create', function(req, res){
    res.render('simpleform.ejs', {action: '/user/create'});
});

// Save User to the Database
router.post('/create', function (req, res) {
    db.Insert( req.body, function (err, result) {
            if (err) throw err;

            if(result.PlayerID != 'undefined') {
                var placeHolderValues = {
		    		Fname: req.body.Fname,
                    Lname: req.body.Lname,
                    PlayerNumber: req.body.PlayerNumber,
                    Team: req.body.Team,
                };
                res.render('displayUserInfo.ejs', placeHolderValues);
            }
            else {
                res.send('Player was not inserted.');
            }
        }
    );
});


module.exports = router;

