var express = require('express');
var router  = express.Router();
var db   = require('../models/db');
var fs = require('fs');
//var image = require('../Images');


/* View all users in a <table> */
router.get('/all', function (req, res) {
    db.GetAll(function (err, result) {
            if (err) throw err;
            res.render('displayPlayerTable.ejs', {rs: result});
        }
    );
});

router.get('/about', function(req, res){
    res.render('about.ejs', {action: '/card/about'});
});

/* Create a User */

// Create User Form
router.get('/create', function(req, res){
	db.GetAllTeams(function (err, result){
		var teamNames = [];
		for (var i in result){
			teamNames.push(result[i].TeamName);
		}
    	res.render('simpleform.ejs', {action: '/card/create', Teams: teamNames});
    });
});

// Save User to the Database
router.post('/create', function(req, res) {
    //console.log("hi", req.files);
    //console.log("hi2", req.body);

    db.SelectPlayer(req.body.Fname, req.body.Lname, req.body.PlayerNumber, function(err, result) {
        if (result == null) {
            db.InsertPlayer(req.body, function(err, result) {
                if (err) throw err;
                if (result.PlayerID != 'undefined') {
                    var placeHolderValues = {
                        Fname: req.body.Fname,
                        Lname: req.body.Lname,
                        PlayerNumber: req.body.PlayerNumber,
                        Team: req.body.Team,
                        Product: req.body.Product,
                        Year: req.body.Year,
                        Type: req.body.Type,
                        CardNumber: req.body.CardNumber,
                    };
                }
            });
            
            //start var
            var placeHolderValues = {
                Fname: req.body.Fname,
                Lname: req.body.Lname,
                PlayerNumber: req.body.PlayerNumber,
                Team: req.body.Team,
                Product: req.body.Product,
                Year: req.body.Year,
                Type: req.body.Type,
                CardNumber: req.body.CardNumber,
                Image: req.files.Image.orginalname,
            };
            placeHolderValues.Image = req.files.Image.originalname;
            console.log("originalname: ", req.files.Image.originalname);
            console.log("Image: ", placeHolderValues.Image);
            console.log("values: ", placeHolderValues);

            //begin file upload
            //get temporary location of file
            var tmp_path = req.files.Image.path;
            //set where the file needs to be
            var target_path = '/home/student/mdelez/cs355/HockeyCards/Images/' + req.files.Image.originalname;
            //console.log("hi4", target_path);

            //move the file from the temp location to the intended location
            fs.rename(tmp_path, target_path, function(err) {
                if (err) throw err;
                //delete temp file
                fs.unlink(tmp_path, function() {
                    if (err) throw err;
                });
            });

            //end file upload
            db.InsertCard(placeHolderValues, function(err, result) {
                if (err) throw err;
                
                if (result)
                    res.render('displayUserInfo.ejs', placeHolderValues);
                else {
                    res.send('Card was not inserted.');
                }
        	});
            //end file upload
        } //closes if statement ln 30
         // end selectPlayer function
        else if (result.PlayerID != null) { // closed

            var placeHolderValues = {
                Fname: req.body.Fname,
                Lname: req.body.Lname,
                PlayerNumber: req.body.PlayerNumber,
                Team: req.body.Team,
                Product: req.body.Product,
                Year: req.body.Year,
                Type: req.body.Type,
                CardNumber: req.body.CardNumber,
                Image: req.files.Image.orginalname,
            };
            placeHolderValues.Image = req.files.Image.originalname;
            console.log("originalname: ", req.files.Image.originalname);
            console.log("Image: ", placeHolderValues.Image);
            console.log("values: ", placeHolderValues);

            //begin file upload
            //get temporary location of file
            var tmp_path = req.files.Image.path;
            //set where the file needs to be
            var target_path = '/home/student/mdelez/cs355/HockeyCards/Images/' + req.files.Image.originalname;
            //console.log("hi4", target_path);

            //move the file from the temp location to the intended location
            fs.rename(tmp_path, target_path, function(err) {
                if (err) throw err;
                //delete temp file
                fs.unlink(tmp_path, function() {
                    if (err) throw err;
                });
            });

            //end file upload
            db.InsertCard(placeHolderValues, function(err, result) {
                if (err) throw err;
                
                if (result)
                    res.render('displayUserInfo.ejs', placeHolderValues);
                else {
                    res.send('Card was not inserted.');
                }
        	});

 		}
    });
    
});

//display all cards of one player
router.get('/', function (req, res) {
    console.log(req.query) // playerID
    //console.log("bloop2")
    db.GetPlayerCards(req.query.PlayerID,
        function(err, result)
        {

            if(err)
                {
                    throw err;
                }
            //console.log(result);
            //console.log("bloop3")
            res.render('displayCardsOfPlayer.ejs', {rs: result});

        }
        );

});

router.post('/delete', function(req, res){
	db.DeleteCard(req.body.CardID, function(err, result){
		    //res.render('updateform.ejs', {action: '/card/delete', Card: result});
		    //res.send("Card Deleted");
		    console.log("CardID: ", req.body.CardID);
		    console.log("next: ", req.body.next);
		    res.redirect(req.body.next);
	});
});

router.get('/update', function(req, res){
	db.SelectCard(req.query.CardID, function(err, result){
		    res.render('updateform.ejs', {action: '/card/update', Card: result});
	});
});

router.post('/update', function(req, res) {
    //console.log("hi", req.files);
    //console.log("hi2", req.body);

    db.SelectPlayer(req.body.Fname, req.body.Lname, req.body.PlayerNumber, function(err, result) {
        if (result == null) {
            db.InsertPlayer(req.body, function(err, result) {
                if (err) throw err;
                if (result.PlayerID != 'undefined') {
                    var placeHolderValues = {
                        Fname: req.body.Fname,
                        Lname: req.body.Lname,
                        PlayerNumber: req.body.PlayerNumber,
                        Team: req.body.Team,
                        Product: req.body.Product,
                        Year: req.body.Year,
                        Type: req.body.Type,
                        CardNumber: req.body.CardNumber,
                    };
                }
            });
            
            //start var
            var placeHolderValues = {
                Fname: req.body.Fname,
                Lname: req.body.Lname,
                PlayerNumber: req.body.PlayerNumber,
                Team: req.body.Team,
                Product: req.body.Product,
                Year: req.body.Year,
                Type: req.body.Type,
                CardNumber: req.body.CardNumber,
                Image: req.files.Image.orginalname,
                CardID: req.body.CardID,

            };
            placeHolderValues.Image = req.files.Image.originalname;
            //console.log("originalname: ", req.files.Image.originalname);
            //console.log("Image: ", placeHolderValues.Image);
            //console.log("values: ", placeHolderValues);

            //begin file upload
            //get temporary location of file
            var tmp_path = req.files.Image.path;
            //set where the file needs to be
            var target_path = '/home/student/mdelez/cs355/HockeyCards/Images/' + req.files.Image.originalname;
            //console.log("hi4", target_path);

            //move the file from the temp location to the intended location
            fs.rename(tmp_path, target_path, function(err) {
                if (err) throw err;
                //delete temp file
                fs.unlink(tmp_path, function() {
                    if (err) throw err;
                });
            });

            //end file upload
            db.UpdateCard(placeHolderValues, function(err, result) {
                if (err) throw err;
                
                if (result)
                    res.render('displayUserInfo.ejs', placeHolderValues);
                else {
                    res.send('Card was not inserted.');
                }
        	});
            //end file upload
        } //closes if statement ln 30
         // end selectPlayer function
        else if (result.PlayerID != null) { // closed

            var placeHolderValues = {
                Fname: req.body.Fname,
                Lname: req.body.Lname,
                PlayerNumber: req.body.PlayerNumber,
                Team: req.body.Team,
                Product: req.body.Product,
                Year: req.body.Year,
                Type: req.body.Type,
                CardNumber: req.body.CardNumber,
                Image: req.files.Image.orginalname,
                CardID: req.body.CardID,
            };
            placeHolderValues.Image = req.files.Image.originalname;
            // console.log("originalname: ", req.files.Image.originalname);
//             console.log("Image: ", placeHolderValues.Image);
//             console.log("values: ", placeHolderValues);

            //begin file upload
            //get temporary location of file
            var tmp_path = req.files.Image.path;
            //set where the file needs to be
            var target_path = '/home/student/mdelez/cs355/HockeyCards/Images/' + req.files.Image.originalname;
            //console.log("hi4", target_path);

            //move the file from the temp location to the intended location
            fs.rename(tmp_path, target_path, function(err) {
                if (err) throw err;
                //delete temp file
                fs.unlink(tmp_path, function() {
                    if (err) throw err;
                });
            });

            //end file upload
            db.UpdateCard(placeHolderValues, function(err, result) {
                if (err) throw err;
                
                if (result)
                    res.render('displayUserInfo.ejs', placeHolderValues);
                else {
                    res.send('Card was not inserted.');
                }
        	});

 		}
    });
    
});
module.exports = router;

