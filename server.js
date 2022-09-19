const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Connect to database
const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'root',
        database: 'employee_tracker'
    },
    console.log('Connected to the employee_tracker database.')
);

inquirer.prompt(
    [
        {
            type:"list",
            name: "project",
            message: "What would you like to do?",
            choices: [
                "View Departments",
                "View Employees",
                "View Roles",
                "Add Department",
                "Add Role",
                "Add Employee",
                "Update Employees Role"
            ]
        }
    ]
)
    .then(function (answer) {
        

        switch (answer.project) {
                case "View Departments":
                viewDepartments()
                break;
                case "View Employees":
                viewEmployees() 
                break;
                case "View Roles":
                viewRoles()
                break;

                case "Add Department":
                addDepartment()
                break;

                case "Add Role":
                addRole()
                break;
                case "Add Employee":
                addEmployee()
                break;
                case "Update Employee Role":
                updateEmployee();
                break;
                default:

    }


    })
             
function viewDepartments() {
            const query = "SELECT * FROM departments"
            db.query(query, function (err, res) {
                if (err) throw err;
                console.table(res)
                // process.exit(0)
            })
        }

function viewEmployees() {

            const query = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, departments.department_name, roles.salary, manager.first_name AS manager_first, manager.last_name AS manager_last
            FROM employee
            LEFT JOIN employee AS manager ON employee.manager_id=manager.id
            INNER JOIN roles ON employee.role_id=roles.id
            INNER JOIN departments ON roles.department_id=departments.id;`
            db.query(query, function (err, res) {
                if (err) throw err;
                console.table(res)
                // process.exit(0)

            })
        }

function viewRoles() {

            const sql = `SELECT roles.id, roles.title, roles.salary, departments.department_name
            FROM roles
            INNER JOIN departments ON roles.department_id=departments.id`
            db.query(sql, function (err, res) {
                if (err) throw err;
                console.table(res)
                // process.exit(0)
            })
        }


function addRole() {
            const departmentQuery = 'SELECT * FROM departments'
            db.query(departmentQuery, function (err,res){
                const departmentInfo = res.map((department)=> {
                    return{
                        name: department.department_name,
                        value: department.id
                    }
                })
                inquirer
    .prompt([
        {
            type: "input",
            name: "title",
            message: "What Role Would you like to add?",
        },
        {
            type: "input",
            name: "salary",
            message: " What is the salary?",
        },
        {
            type: "list",
            name: "department",
            message: "What department does this belong to?",
            choices: departmentInfo
        },

    ]).then(function (answers) {
        console.log(answers)
        var query = `INSERT INTO roles (title, salary, department_id)
        VALUES ('${answers.title}', ${answers.salary}, ${answers.department})`
        db.query(query, function(err,res){
         if (err) throw err;
        console.log("title has been added");   
        process.exit(0)
        })
        
    })
            })

    }

    function addEmployee() {
        const roleQuery = 'SELECT * FROM roles'
        db.query( roleQuery, function( err,res){
            const roleInfo = res.map (({title, id})=>({ name: title, value: id }))
                
                         
        const employeeQuery = 'SELECT * FROM employee'
       db.query(employeeQuery, function (err,res){
            const employeeInfo = res.map(({first_name, last_name, id})=> ({ name:first_name,last_name,value: id}))
            
       
            inquirer
.prompt([
    {
        type: "input",
        name: "firstName",
        message: "What is the employees first name?",
    },
    {
        type: "input",
        name: "lastName",
        message: " What is the employees last name?",
    },
    {
        type: "list",
        name: "employeeRole",
        message: "What is the employees role?",
        choices: employeeInfo
    },
    {
        type: "list",
        name: "manager",
        message: "What is the employees manager?",
        choices: roleInfo
    },
       

])}).then(function (answers) {
    console.log(answers)
    var query = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ('${answers.firstName}', ${answers.lastName}, ${answers.employeeRole}, ${answers.manager}})`
    db.query(query, function(err,res){
     if (err) throw err;
    console.log("title has been added");   
    process.exit(0)
    })
    
})
        })

}


function addDepartment() {
    inquirer
        .prompt({
            type: "input",
            name: "department_name",
            message: "What department would you like to add?",
        }).then(function (answer) {
const query = `INSERT INTO departments(department_name)
VALUES ('${answer.department_name}')`
db.query(query, function(err,res){
    if (err) throw err;
        console.log("department has been added");   
        process.exit(0)
})
        })
    }


function updateEmployee() {
    const query = "SELECT * FROM roles;"
    db.query(query, function (err, data) {
        console.table(data);
          inquirer
          .prompt([
        {
          name: "updatedRoleTitle",
          type: "input",
          message: "What is the job title for your new role?",
        },
        {
          name: "updatedRoleSalary",
          type: "number",
          message: "What is the salary for your new role?",
        },
        {
          name: "updatedDepartmentID",
          type: "number",
          message: "What is the department ID for your new role?",
        },
      ])
        .then(function (answer) {
            const query = `INSERT INTO roles (title, salary, department_id) VALUES ("${answer.updatedRoleTitle}", "${answer.updatedRoleSalary}", "${answer.updatedDepartmentID}");`
            db.query(query, function (err, data) {
            if (err) {
                console.log(err);
                return;
            } else {
                console.log("Updated Role Successfully!");
                viewRoles();
                return;
            }
          }
        );
      });
    }
)}