var mysql   = require('mysql');


/* DATABASE CONFIGURATION */
var connection = mysql.createConnection({
    host: 'cwolf.cs.sonoma.edu',
    user: 'mdelez',
    password: '003649222'
    //user: 'your_username',
    //password: 'your_password'
});

var dbToUse = 'mdelez';

//use the database for any queries run
var useDatabaseQry = 'USE ' + dbToUse;

//create the User table if it does not exist
connection.query(useDatabaseQry, function (err) {
    if (err) throw err;
});

exports.GetAll = function(callback) {
    connection.query('select * from Players',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.GetAllTeams = function(callback) {
    connection.query('select * from Team',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.GetPlayerCards = function(PlayerID, callback) {
    var query = "select Players.Fname, Players.Lname, Players.PlayerID, CardNumber, Card.CardID, Image, ProductName, ProductYear, Type from Players, Card, Manufacturer, CardType WHERE Players.PlayerID = '" + PlayerID + "' and Card.PlayerID = '" + PlayerID+ "' and Card.TypeID = CardType.TypeID and Manufacturer.ID = Card.ProductID;";
    //console.log("bloop")
    //console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}


exports.SelectPlayer = function(Fname, Lname, PlayerNumber, callback){
	console.log(Fname, Lname, PlayerNumber);
	var query = "Select * from Players where Fname = '" + Fname + "' and Lname = '" + Lname + "' and PlayerNumber = '" + PlayerNumber + "';";
	console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
			if(result.length == 0){
            	callback(false, null);
            }
            else{
            	callback(false, result[0]);
            }
        }
    );
}

exports.SelectCard = function(CardID, callback){
	var query = "Select * from Card, Players where CardID = '" + CardID + "' and Players.PlayerID = Card.PlayerID;";
	console.log("Select: ", query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
			if(result.length == 0){
            	callback(false, null);
            }
            else{
            	callback(false, result[0]);
            }
        }
    );
}

exports.DeleteCard = function(CardID, callback){
	var query = "Delete from Card where CardID = '" + CardID + "';";
	console.log("Delete: ", query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
			if(result.length == 0){
            	callback(false, null);
            }
            else{
            	callback(false, result[0]);
            }
        }
    );
}

exports.InsertPlayer = function(playerInfo, callback) {
    //console.log(playerInfo);
    var teamID = "(Select Team.TeamID from Team where Team.TeamName = '" +  playerInfo.Team + "')";
    var query = 'INSERT INTO Players (Fname, Lname, PlayerNumber, Team, TeamID) VALUES (\'' + playerInfo.Fname + '\', \'' + playerInfo.Lname + '\', \''  + playerInfo.PlayerNumber + '\', \'' + playerInfo.Team + '\', ' + teamID + ');';
    console.log("Insert Player: ", query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.InsertCard = function(cardInfo, callback) {
    //console.log("cardInfo", cardInfo);
    var playerID = "(Select Players.PlayerID from Players where Players.Fname = '" + cardInfo.Fname + "' and Players.Lname = '" + cardInfo.Lname + "' and Players.Team = '" + cardInfo.Team + "')";
    var productID = "(Select Manufacturer.ID from Manufacturer where Manufacturer.ProductName = '" + cardInfo.Product + "' and Manufacturer.ProductYear = '" + cardInfo.Year + "')";
    var typeID = "(Select CardType.TypeID from CardType where CardType.Type = '" + cardInfo.Type + "')";
    var query = "INSERT INTO Card (CardNumber, PlayerID, ProductID, TypeID, Image) VALUES ('" + cardInfo.CardNumber + "', " + playerID + ", " + productID + ", " + typeID + ", '" + cardInfo.Image + "');";
    console.log("Insert card: ", query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.UpdateCard = function(updateInfo, callback) {
    //console.log("updateInfo", updateInfo);
    var playerID = "(Select Players.PlayerID from Players where Players.Fname = '" + updateInfo.Fname + "' and Players.Lname = '" + updateInfo.Lname + "' and Players.Team = '" + updateInfo.Team + "')";
    var productID = "(Select Manufacturer.ID from Manufacturer where Manufacturer.ProductName = '" + updateInfo.Product + "' and Manufacturer.ProductYear = '" + updateInfo.Year + "')";
    var typeID = "(Select CardType.TypeID from CardType where CardType.Type = '" + updateInfo.Type + "')";
	var query = "UPDATE Card SET CardNumber = '" + updateInfo.CardNumber + "', PlayerID = " + playerID + ", ProductID = " + productID + ", TypeID = " + typeID + ", Image = '" + updateInfo.Image + "' where CardID = " + updateInfo.CardID + ";";
    console.log("Update Query: ", query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}



exports.InsertCardType = function(cardTypeInfo, callback) {
    console.log(cardTypeInfo);
    var query = "INSERT INTO CardType (Type) VALUES ('" + cardTypeInfo.Type + "');";
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.InsertManufacturer = function(manufacturerInfo, callback) {
    console.log(manufacturerInfo);
    var query = "INSERT INTO Card (ProductName, ProductYear) VALUES ('" + manufacturerInfo.Product + "'" + manufacturerInfo.Year + "');";
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}
