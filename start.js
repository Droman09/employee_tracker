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
    if (err) throw err;
    console.log(`connected to MySQL on ${connection.threadId}`)
    runOptions();
})

const options = ["View Department", "View Role", "View Employee", "Add Department", "Add Role", "Add Employee", "Update Employee Role", "Exit"];

function runOptions() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "\nWhat would you like to do?",
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
                case options[7]:
                    console.log("\nGoodBye!\n")
                    connection.end()
                    break;
            }
        })
}


function viewDep() {
    var query = "SELECT * FROM department"
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        runOptions()
    })
};


function viewRole() {
    var query = "SELECT * FROM role"
    connection.query(query, (err, res) => {
        console.table(res);
        runOptions()
    })
};


function viewEmp() {
    var query = "SELECT e.*, CONCAT (m.first_name, ' ', m.last_name) manager FROM employee AS e LEFT JOIN employee AS m ON e.manager_id = m.id"
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        runOptions()
    })

};


function addDep() {
    var query = "SELECT * FROM department"
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
    })
    inquirer
        .prompt({
            name: "Dept",
            type: "input",
            message: "What is the name if the new department"
        })

};


function addRole() {
    inquirer
        .prompt({

        })

};

function addEmp() {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "New emplyees first name"
            },
            {
                name: "lastName",
                type: "input",
                message: "New emplyees last name"
            },
            {
                name: "newRole",
                type: "list",
                message: "New emplyees role",
                choices: roleList()
            },
            {
                name: "assignMan",
                type: "list",
                message: "Assign new employees to a manager (optional)",
                choices: managerList()
            }
        ]).then((answer) => {
            const query = "INSERT INTO employee SET ?";
            connection.query(query,
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.newRole,
                    manager_id: answer.assignMan
                },
                err => {
                    if (err) throw err,
                        console.log("new employee added")
                    runOptions();
                })
        })


};

var empArray = [];
function updateEmp() {
    const query = "SELECT first_name, last_name FROM employee"
    connection.query(query, (err, res) => {
        if (err) throw err;
        inquirer
            .prompt({
                name: "employees",
                type: "list",
                choices: function () {

                    res.forEach(emp => {
                        empArray.push(emp.first_name + " " + emp.last_name)
                    })
                    return empArray

                },
                message: "Select employee"
            })
    })
};


var roleArr = []
function roleList() {
    const query = "SELECT * FROM role"
    connection.query(query, (err, res) => {
        if (err) throw err;
        res.forEach(index => {
            roleArr.push(index.title)
        })

    })
    return roleArr
}

var managerArr = ["None"];
function managerList() {
    const query = "SELECT * FROM employee WHERE manager_id IS NOT NULL"
    connection.query(query, (err, res) => {
        if (err) throw err;
        res.forEach(index => {
            managerArr.push(index.first_name)
        })
    })
    return managerArr
}



// function validateNum(num) {
//     if (isNaN(num) === false) {
//         return true;
//     } else {
//         console.log("Insesrt a value")
//         return false;
//     };
// };