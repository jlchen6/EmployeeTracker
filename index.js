// Import libraries
const inquirer = require("inquirer");
const data = require("./db/data");

// Code to prompt user with menu using inquirer
function mainMenu() {
    return inquirer.prompt({
        message: "What would you like to do?: ",
        type: "list",
        choices: ["Add a Department/Role/Employee", "View Data", "Update Employee Data", "Quit"],
        name: "main"
    }).then(response => {
        switch (response.main) {
            case "Add a Department/Role/Employee":
                return addToTable();
            case "View Data":
                return viewData();
            case "Update Employee Data":
                return updateEmployee();
            case "Quit":
                data.connection.end();
                return false;
            default:
                return mainMenu();
        }
    })
        .catch(error => {
            console.log(error);
        })

}

// Function that prompts user for information needed to add a department/role/employee
function addToTable() {

    return inquirer.prompt({
        type: "list",
        message: "What data would you like to add?: ",
        choices: ["employee", "role", "department"],
        name: "table"
    }).then(({ table }) => {
        switch (table) {
            case "employee":
                return addNewEmployee();
            case "role":
                return addNewRole();
            case "department":
                return addNewDepartment();
        }
    })
        .then(response => {
            // console.log(response);
            return mainMenu();
        })
        .catch(error => {
            console.log(error);
        })
}

// Menu for creating an employee. prompts user for employee information
function addNewEmployee() {
    // Define questions to ask when creating an employee
    var questions = [{
        message: "What is this employee's first name?: ",
        name: "first"
    },
    {
        message: "What is this employee's last name?: ",
        name: "last"
    },
    {
        message: "What is this employee's role ID?: ",
        name: "role"
    },
    {
        message: "What is the ID of this employee's manager? (Enter 0 if they don't have one): ",
        name: "manager"
    }];

    // Call inquirer to ask questions
    return inquirer.prompt(questions).then(function ({ first, last, role, manager }) {
        if (parseInt(manager) < 1) {
            manager = null;
        }
        var dataArray = [first, last, role, manager]
        return data.insertData("employee", dataArray);
    })
}

// Menu for creating an role. prompts user for role information
function addNewRole() {
    // Define questions to ask when creating an role
    var questions = [{
        message: "What is this role's title?: ",
        name: "title"
    },
    {
        message: "What is this role's salary?: ",
        name: "salary"
    },
    {
        message: "What is this role's department ID?: ",
        name: "department"
    }];

    // Call inquirer to ask questions
    return inquirer.prompt(questions).then(function ({ title, salary, department }) {
        var dataArray = [title, salary, department]
        return data.insertData("role", dataArray);
    })
}

// Menu for creating a department. prompts user for department information
function addNewDepartment() {
    // Define questions to ask when creating an department
    var questions = [{
        message: "What is the name of this deparment?: ",
        name: "title"
    }];

    // Call inquirer to ask questions
    return inquirer.prompt(questions).then(function ({ title }) {
        var dataArray = [title]
        return data.insertData("department", dataArray);
    })
}

// Function to prompt user for details on what data they want to view
function viewData() {
    var questions = [{
        type: "list",
        message: "What data would you like to view?",
        choices: ["employee", "role", "department"],
        name: "table"
    }]

    return inquirer.prompt(questions).then(({ table }) => {
        return data.selectAll(table);
    })
        .then(tableData => {
            if (tableData.length > 0) {
                console.table(tableData);
            }
            else {
                console.log("There doesn't seem to be any data in that table!");
            }
            mainMenu();
        })
        .catch(error => {
            console.log(error);
        })
}

// Function to prompt user for details on what employee data to update
function updateEmployee() {
    var questions = [{
        message: "What is the id of the employee you'd like to update?: ",
        name: "employeeID"
    },
    {
        message: "What is the role id of this employee's new role?",
        name: "roleID"
    }];

    return inquirer.prompt(questions).then(({employeeID, roleID}) => {
        return data.updateEmployeeRole(employeeID, roleID);
    })
    .then(response => {
        // console.log(response);
        mainMenu();
    })
    .catch(error => { console.log(error)});
}

mainMenu();