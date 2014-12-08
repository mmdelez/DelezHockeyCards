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
    res.render('simpleform.ejs', {action: '/cardtype/create'});
});

// Save User to the Database
router.post('/create', function (req, res) {
    db.InsertCardType( req.body, function (err, result) {
            if (err) throw err;

            if(result.PlayerID != 'undefined') {
                var placeHolderValues = {
                    Type: req.body.Type,
                };
                res.render('displayUserInfo.ejs', placeHolderValues);
            }
            else {
                res.send('Card Type was not inserted.');
            }
        }
    );
});

/* View a single user's information */
/* INCOMPLETE */
router.get('/', function (req, res) {
    res.send('Implement this as part of lab 19');
});


module.exports = router;

