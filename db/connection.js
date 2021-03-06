const mysql = require("mysql");
const util = require ("util");
// Create the connection object that connects to the database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "sql555",
    database: "employees_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

connection.query = util.promisify(connection.query);

module.exports = connection;