// import mysql library in order to create a connection to the database

const connection = require("./connection");

class Data {
    //functions that send queries to the database. 
    constructor(connection) {
        this.connection = connection;
    }
    // Function that performs a SELECT query and returns the selected data
    selectOneRow(table, column, value) {
        return this.connection.query("SELECT * FROM ?? WHERE ?? = ?", [table, column, value]);

    }

    selectAll(table) {
        return this.connection.query("SELECT * FROM ??", [table]);
    }

    // Function that performs an UPDATE query and updates the given row with the updated data
    updateData(table, updatedColumn, updatedValue, column, value) {
        return this.connection.query("UPDATE ?? SET ?? = ? WHERE ?? = ?", [table, updatedColumn, updatedValue, column, value]);
    }

    updateEmployeeRole(id, updatedRole) {
        return this.connection.query("UPDATE employee SET roleID = ? WHERE id = ?", [updatedRole, id]);
    }

    // Function that performs an INSERT query and adds a row with the given information. Takes in a string with the table name, and a data array with the data values being inserted into the table
    insertData(table, data) {
        var queryString = "INSERT INTO ";

        switch(table){
            case "employee":
                queryString += "employee (first_name, last_name, roleID, managerID) VALUES (?, ?, ?, ?)";
                break;
            case "role":
                queryString += "role (title, salary, departmentID) VALUES (?, ?, ?)";
                break;
            case "department":
                queryString += "department (name) VALUES (?)";
            break;
        }

        return this.connection.query(queryString, data);


    }
}

// testDB = new Data(connection);
// testDB.insertData("department", ["HR"]);
// testDB.insertData("role", ["Marketing", "40000", 1]);
// testDB.insertData("employee", ["Jane", "Doe", 2, null]);
// testDB.updateEmployeeRole(2, 1);
// testDB.updateData("employee","managerID", 1, "id", 2);
// testDB.selectAll("employee").then(response => console.table(response)).catch(error => {
//     console.log(error);
// });

// connection.end();
module.exports = new Data(connection)