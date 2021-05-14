const dbconnection =require('mysql');

const db = dbconnection.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'rhms'
});

module.exports = {db};