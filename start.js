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
    runOptions();
})

const options = ["View Department", "View Role", "View Employee", "Add Department", "Add Role", "Add Employee", "Update Employee Role"]

function runOptions(){
  inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: options
    })
    .then(answer => {
        switch (answer.action) {
        case options[0]:
        viewDep();
        break;

        case options[1]:
        viewRole();
        break;

        case options[2]:
        viewEmp();
        break;

        case options[3]:
        addDep();
        break;

        case options[4]:
        addRole();
        break;

        case options[5]:
        addEmp();
        break;

        case options[6]:
        updateEmp();
        break;
        }
    })
}















function validateNum(num){
    if(isNaN(num) === false ) {
        return true;
    } else{
        return false;
    }
}