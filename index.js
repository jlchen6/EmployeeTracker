// Import libraries
const inquirer = require("inquirer");
const data = require("./db/data");

// Code to prompt user with menu using inquirer
function mainMenu(){
    inquirer.prompt({
        message: "What would you like to do?: ",
        type: "list",
        choices: ["Add a Department/Role/Employee", "View Data", "Update Employee Data"],
        name: "main"
    }).then(response => {
        switch(response.main){
            case "Add a Department/Role/Employee":
                return addToTable();
            case "View Data":
                return viewData();
            case "Update Employee Data":
                return updateEmployee();
        }
    })

}

// Function that prompts user for information needed to add a department/role/employee
function addToTable(){

}

// Function to prompt user for details on what data they want to view
function viewData(){

}

// Function to prompt user for details on what employee data to update
function updateEmployee(){

}