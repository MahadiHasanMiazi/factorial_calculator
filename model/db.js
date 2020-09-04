var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Pa$$word1',
    database : 'phonebook'
});
connection.connect(err => {
    if(!err){
        console.log('Successfully connect to the database');
    }else {
        console.log('DB connection failed! \n Error : ' + JSON.stringify(err, undefined, 2));
    }
});

module.exports = connection;
