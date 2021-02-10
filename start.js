const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "emp_trackerDB"
});

connection.connect(err => {
    if (err) throw err;
    console.log(`connected to MySQL on ${connection.threadId}`)
    runOptions();
})

//PROGRAM STARTS ---------------------------

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

//VIEWS -------------------------------

function viewDep() {
    const query = "SELECT * FROM department"
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        runOptions()
    })
};


function viewRole() {
    const query = "SELECT * FROM role"
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        runOptions()
    })
};


function viewEmp() {
    const query = "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS manager FROM employee INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON department.id = role.department_id LEFT JOIN employee e ON employee.manager_id = e.id;"
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        runOptions()
    })

};

//ADD NEW DEPARTMENT -------------------------

function addDep() {
    inquirer
        .prompt({
            name: "dept",
            type: "input",
            message: "Insert new department"
        }).then(result => {
            const query = "INSERT INTO department SET ?"
            connection.query(query, { name: result.dept }, (err, res) => {
                if (err) throw err;
                console.table(res);
                runOptions()
            })
        })



};

//ADD NEW ROLE------------------------------------------

function addRole() {
    inquirer
        .prompt([{
            name: "role",
            type: "input",
            message: "What is the name if the new role"
        },
        {
            name: "salary",
            type: "input",
            message: "Salary of new Role"
            // validate: validateNum()
        },
        {
            name: "department_id",
            type: "list",
            message: "Department Id",
            choices: deptList()
        }]
        ).then(answer => {
            const deptId = deptList().indexOf(answer.department_id) + 1
            const query = "INSERT INTO role SET ?"
            connection.query(query, {
                title: answer.role,
                salary: answer.salary,
                department_id: deptId
            }, (err, res) => {
                if (err) throw err;
                console.table(res);
                runOptions()
            })
        })
};

//ADD NEW EMPLOYEE ------------------------------

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
            const roleId = roleList().indexOf(answer.newRole) + 1
            const managerId = managerList().indexOf(answer.assignMan)
            if(managerId === "NULL"){
                return null
            };
            const query = "INSERT INTO employee SET ?";
            connection.query(query,
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: roleId,
                    manager_id: managerId
                },
                err => {
                    if (err) throw err;
                    console.log("new employee added")
                    runOptions();
                })
        })


};

//EMPLOYEE UPDATE -------------------

var empArray = [];
function updateEmp() {
    const query = "SELECT employee.last_name, role.title FROM employee INNER JOIN role ON employee.role_id = role.id"
    connection.query(query, (err, res) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "employees",
                    type: "list",
                    message: "Select employee",
                    choices: function () {
                        res.forEach(emp => {
                            empArray.push(emp.last_name)
                        })
                        return empArray
                    }
                },
                {
                    name: "newRole",
                    type: "list",
                    message: "Give the employee a new title",
                    choices: roleList()
                }
            ]).then(answer => {
                const roleId = roleList().indexOf(answer.newRole) + 1
                const query2 = "UPDATE employee SET ? WHERE ?"
                connection.query(query2,
                    [{
                        role_id: roleId
                    }, {
                        last_name: answer.employees
                    }],
                        (err, result) => {
                        if (err) throw err;
                        console.log("Congrates on your new position")
                        runOptions()
                    })
            })
    })
};



//ARRAYS --------------------------------

var deptArr = []
function deptList() {
    const query = "SELECT * FROM department;"
    connection.query(query, (err, res) => {
        if (err) throw err;
        res.forEach(index => {
            deptArr.push(index.name)
        })

    })
    return deptArr
}

var roleArr = []
function roleList() {
    const query = "SELECT * FROM role;"
    connection.query(query, (err, res) => {
        if (err) throw err;
        res.forEach(index => {
            roleArr.push(index.title)
        })

    })
    return roleArr
}

var managerArr = ["NULL"];
function managerList() {
    const query = "SELECT *, CONCAT (first_name,' ', last_name) AS name FROM employee;"
    connection.query(query, (err, res) => {
        if (err) throw err;
        res.forEach(index => {
            managerArr.push(index.name )
            
        })
    })
    return managerArr
}

//VALIDATE-----------------------------------------

// function validateNum(num) {
//     if (isNaN(num) === false) {
//         return true;
//     } else {
//         console.log("Insesrt a value")
//         return false;
//     };
// };