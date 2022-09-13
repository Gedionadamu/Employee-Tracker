import inquirer from 'inquirer'
import mysql from 'mysql2';
import cTab from "console.table"
const connection = mysql.createConnection({
    host: "localhost:3306",
    user: "root",
    password: "rootroot",
    database: "employee_db",

}, 
console.log('connected with the employee database'))

connection.connect(function (response, err) {
    if (err) {
        throw err
    }
    questions();
})
async function questions() {
    const answers = await inquirer.prompt([{
        type: "list",
        name: "choice",
        message: "Choose action:",
        choices: [
            "View All Employees",
            "View All Departments",
            "View All Roles",
            "Add New Employee",
            "Add Role",
            "Add Department",
            "Update Employee",
            "Quit"
        ]
    },]).then((answers) => {
        switch (answers.choice) {

            case "Add New Employee": employeeAdd();
                break;
            case "Add Role": roleAdd();
                break;
            case "Add Department": departmentAdd();
                break;
            case "View All Employees": viewEmployees();
                break;
            case "View All Departments": viewDepartments();
                break;
            case "View All Roles": viewRoles();
                break;
            case "Update Employee": updateEmployee();
                break;
            case "Quit": quit();
                break;
        }

    });
}



async function employeeAdd() {
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "Enter First Name:"
        }, {
            type: "input",
            name: "lastName",
            message: "Enter Last Name:"
        }, {
            type: "list",
            name: "role",
            message: "Choose Role:",
            choices: [
                {
                    value: 1,
                    name: "Sales Lead"
                },
                {
                    value: 2,
                    name: "Salesperson"
                },
                {
                    value: 3,
                    name: "Lead Engineer"
                },
                {
                    value: 4,
                    name: "Software Engineer"
                }, {
                    value: 5,
                    name: "Account Manager"
                }, {
                    value: 6,
                    name: "Accountant"
                }, {
                    value: 7,
                    name: "Legal Team Lead"
                },
            ]
        }, {
            type: "list",
            name: "manager",
            message: "Select Manager:",
            choices: [
                {
                    value: 1,
                    name: "Principal Director"
                },
                {
                    value: 2,
                    name: "Head of Legal Sevices"
                },
                {
                    value: 3,
                    name: "Head Accounting"
                },
                {
                    value: 4,
                    name: "Operations Manager"
                }, {
                    value: 5,
                    name: "Head of research and development"
                }, {
                    value: 0,
                    name: "none"
                },
            ]
        },
    ]);
    console.log(answers)
    connection.query(`INSERT INTO employees(first_name, last_name, roles_id, manager_id) 
            VALUES ('${answers.firstName
        }', '${answers.lastName
        }' ,'${answers.role
        }','${answers.manager
        }');`, function (err, response) {
            if (err) {
                throw err
            };

            console.log("✅");
            questions();
        });

}

// add role
async function roleAdd() {
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "titleName",
            message: "Enter Name of Title:"
        }, {
            type: "input",
            name: "salary",
            message: "Enter Salary:"
        }, {
            type: "list",
            name: "departmentID",
            message: "Select Department",
            choices: [
                {
                    value: 1,
                    name: "Sales"
                }, {
                    value: 2,
                    name: "Engineering"
                }, {
                    value: 3,
                    name: "Finance"
                }, {
                    value: 4,
                    name: "Legal"
                },
            ]
        },
    ]);
    connection.query(`INSERT INTO roles(title_name, salary, departments_id) 
            VALUES ('${answers.titleName
        }', '${answers.salary
        }','${answers.departmentID
        }');`, function (err, response) {
            if (err) {
                throw err
            };


            console.log("Role Added!");
            questions();
        });
}

// add department
async function departmentAdd() {
    const answers = await inquirer.prompt([{
        type: "input",
        name: "addDept",
        message: "Enter Department Name:"
    },]);
    connection.query(`INSERT INTO departments (department_name) 
            VALUES ('${answers.addDept
        }');`, function (err, response) {
            if (err) {
                throw err
            };

            console.log("✅");
            questions();
        });
}
function viewEmployees() {
    console.log("lets see if it gets here")
    connection.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title_name, departments.department_name 
            AS departments, roles.salary, 
            CONCAT (managers.first_name, " ", managers.last_name) 
            AS manager 
            FROM employees
            LEFT JOIN roles 
            ON employees.roles_id = roles.id
            LEFT JOIN departments ON roles.departments_id = departments.id
            LEFT JOIN employees managers ON employees.manager_id = managers.id;`, function (err, response) {
        if (err) {
            throw err
        };

        console.log(response);
        cTab(response);
        questions();
    });
}

// view by department
function viewDepartments() {
    connection.query(`SELECT departments.department_name, roles.title_name 
            FROM roles 
            JOIN departments 
            ON departments.id = roles.departments_id 
            JOIN employees 
            ON employees.roles_id = roles.id;`, function (err, response) {
        if (err) {
            throw err
        };


        console.table(response);
        questions();
    });
}

// view by role
function viewRoles() {
    connection.query(`SELECT roles.title_name, roles.salary
            FROM employees 
            JOIN roles 
            ON employees.roles_id = roles.id;`, function (err, response) {
        if (err) {
            throw err
        };

        console.log(response)
        cTab(response);
        questions();
    });
}


// update employee
function updateEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'updateEmployee',
            message: 'Enter Employee ID to Update:'
        }, {
            type: 'input',
            name: "updateRole",
            message: "Enter ID of New Role:"
        },
    ]).then(function (response) {
        const updateEmployee = response.updateEmployee;
        const updateRole = response.updateRole;
        const queryUpdate = `UPDATE employees 
        SET roles_id = '${updateRole}' 
        WHERE id = '${updateEmployee}'`;
        connection.query(queryUpdate, function (err, response) {
            if (err) {
                throw err
            };


        })

        console.log("Updated!")
        console.table(response);
        questions();
    });
}

// exit function
function quit() {
    console.log('Bye!')
    connection.end()
    process.exit();
}