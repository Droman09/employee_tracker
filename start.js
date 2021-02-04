const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "coldweather2020",
    database: ""
}); 

connection.connect(err => {
    if(err) throw err;
    //start command line function
})