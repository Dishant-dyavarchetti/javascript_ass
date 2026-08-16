//68

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Employee {

    constructor(id, name, department, salary) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.salary = salary;
    }

    display() {
        console.log(
            `ID: ${this.id}, Name: ${this.name}, Department: ${this.department}, Salary: ${this.salary}`
        );
    }
}

let employees = [];
function menu() {

    console.log("\n===== Employee Management System =====");
    console.log("1. Add Employee");
    console.log("2. Modify Employee");
    console.log("3. Search Employee");
    console.log("4. Delete Employee");
    console.log("5. Display All Employees");
    console.log("6. Exit");

    rl.question("Enter your choice: ", function(choice) {

        switch (choice) {

            case "1":
                addEmployee();
                break;

            case "2":
                modifyEmployee();
                break;

            case "3":
                searchEmployee();
                break;

            case "4":
                deleteEmployee();
                break;

            case "5":
                displayEmployees();
                break;

            case "6":
                console.log("Program terminated.");
                rl.close();
                break;

            default:
                console.log("Invalid choice!");
                menu();
        }
    });
}


function addEmployee() {

    rl.question("Enter Employee ID: ", function(id) {

        rl.question("Enter Employee Name: ", function(name) {

            rl.question("Enter Department: ", function(department) {

                rl.question("Enter Salary: ", function(salary) {

                    let employee = new Employee(
                        id,
                        name,
                        department,
                        salary
                    );

                    employees.push(employee);

                    console.log("Employee added successfully.");

                    menu();
                });
            });
        });
    });
}


function modifyEmployee() {

    rl.question("Enter Employee ID to modify: ", function(id) {

        let employee = employees.find(emp => emp.id === id);

        if (employee) {

            rl.question("Enter New Name: ", function(name) {

                rl.question("Enter New Department: ", function(department) {

                    rl.question("Enter New Salary: ", function(salary) {

                        employee.name = name;
                        employee.department = department;
                        employee.salary = salary;

                        console.log("Employee updated successfully.");

                        menu();
                    });
                });
            });

        } else {

            console.log("Employee not found.");
            menu();
        }
    });
}

function searchEmployee() {

    rl.question("Enter Employee ID to search: ", function(id) {

        let employee = employees.find(emp => emp.id === id);

        if (employee) {

            console.log("\nEmployee Found:");
            employee.display();

        } else {

            console.log("Employee not found.");
        }

        menu();
    });
}

function deleteEmployee() {

    rl.question("Enter Employee ID to delete: ", function(id) {

        let index = employees.findIndex(emp => emp.id === id);

        if (index !== -1) {

            employees.splice(index, 1);

            console.log("Employee deleted successfully.");

        } else {

            console.log("Employee not found.");
        }

        menu();
    });
}

function displayEmployees() {

    if (employees.length === 0) {

        console.log("No employees available.");

    } else {

        console.log("\n===== Employee Details =====");

        employees.forEach(function(employee) {
            employee.display();
        });
    }

    menu();
}
menu();