const dbconnection =require('mysql');

const db = dbconnection.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'i@mbatMAN',
    database : 'rhms'
});

module.exports = {db};