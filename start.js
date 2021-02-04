const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "coldweather2020",
    database: "emp_trackerDB"
}); 

connection.connect(err => {
    if(err) throw err;
    console.log(`connected to MySQL on ${connection.threadId}`)
    //start command line function
})