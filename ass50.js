const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let emps = [];

class Employee{
    constructor(id, name, salary){
        this.id = id;
        this.name = name;
        this.salary = salary;
    }
}

function addEmployee(){
    rl.question("Enter Employee ID: ", (id) => {
        rl.question("Enter the name of the Employee: ", (name) => {
            rl.question("Enter the salary of the employee: ", (salary) => {
                const id = Number(id);
                const salary = Number(salary);

                let tempEmp = new Employee(id, name, salary);
                emps.push(tempEmp);
                console.log("\n Employee Added Sucessfully");

                showMenu();
            });
        });
    });
}

function displayEmployees(){
    if(emps.length === 0){
        console.log("\n No Employees Found in the record");

    }else{
        console.log("\n Employee Records Found.");
        emps.forEach(emp => {
            console.log(`Emp Id: ${emp.id}`);
            console.log(`Emp Name: ${emp.name}`);
            console.log(`Salary: ${emp.salary}`);
        });
    }
    showMenu();
}

function searchEmployee(){
    rl.question("Enter the ID of the Employee: ", (id) => {
        const id = Number(id);
        let emp = emps.find(emp => {emp.id == id});
        if(emp){
            console.log("\nEmployee Found");
            console.log(`ID: ${emp.id}`);
            console.log(`Name: ${emp.name}`);
            console.log(`Salary: ${emp.salary}`);
        }else{
            console.log("Employee not found");
        }

        showMenu();
    });


}

function updateEmployee(){
    rl.question("Enter the ID of Emp to Update: ", (id) => {
        const id = Number(id);
        let emp = emps.find((emp) => {emp.id == id});
        if(!emp){
            console.log("\n Employee not found");
            showMenu();
            return;
        }

        console.log(`Current Name: ${emp.name}`);
        console.log(`Current Salary: ${emp.name}`);
        rl.question("Enter the Updated Name of the Employee: ", (name) => {
            rl.question("Enter the Update Salary of the employee: ",(salary) => {
                const salary = Number(salary);
                // let newEmp = new Employee(id, name, salary);
                emp.name = name;
                emp.salary = salary;
                // emp = newEmp;
                console.log("Employee data Updated...");
                showMenu();
                
            });
        });
    });
}

function deleteEmp(){
    rl.question("Enter the ID of emp which you want to delete: ", (id) => {
        let empIndex = emps.findIndex((emp) => {emp.id == id});
        if(empIndex == -1){
            console.log(`Employee with ${id} cant be found`);

        }else{
            emps.splice(empIndex, 1);
            console.log(`Employee with the id ${id} has been removed Successfully`);
        }
        showMenu();
    });
}

function showMenu(){
    console.log("\n ---- EMPLOYEE MANAGEMENT SYSTEM ");
    console.log("1) Add Employee");
    console.log("2) Search Employee");
    console.log("3) Update Employee");
    console.log("4) Display All Employee");
    console.log("5) Delete a Employee");
    console.log("6) Exit from the program");
    rl.question("Enter Your choice: ", (choice) => {
        switch(choice){
            case "1":
                addEmployee();
                break;
            case "2":
                searchEmployee();
                break;
            case "3":
                updateEmployee();
                break;
            case "4":
                displayEmployees();
                break;
            case "5":
                deleteEmp();
                break;
            case "6":
                console.log("\nExiting from the program");
                rl.close();
                break;
            default:
                console.log("\n invalid Choice");
                showMenu();

        }
    });
}

showMenu();