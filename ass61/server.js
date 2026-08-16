const express = require('express');
const path = require('path');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

class Employee{
    constructor(emp_id, name, role, salary){
        this.emp_id = emp_id;
        this.name = name;
        this.role = role;
        this.salary = salary;

    }
}

let employees = [];

// create employee
app.post("/", (req, res) => {
    let id = Number(req.body.id);
    let name = req.body.name;
    let role = req.body.role;
    let sal = Number(req.body.salary);

    let tempEmp = new Employee(id, name, role, sal);
    employees.push(tempEmp);

    res.send("Employee added successfully");
});

// view Employee
app.get("/view", (req, res) => {
    res.send(JSON.stringify(employees));
});

app.listen((3001), () => {
    console.log("Server is running at http://localhost:3001");
});

// update user
app.put("/update/:id", (req, res) => {
    let id = Number(req.params.id);

    let name = req.body.name;
    let role = req.body.role;
    let sal = Number(req.body.salary);

    let emp = employees.find((emp) => id === emp.emp_id);
    if(!emp){
        res.send("Student does not exist in the List");
        return;
    }
    emp.name = name;
    emp.role = role;
    emp.salary = sal;
    res.send("Student Updated Successfully");
});

// delete data
app.delete("/delete/:id", (req, res) => {
    let id = Number(req.params.id);

    let index = employees.findIndex((emp) => id === emp.emp_id);
    if(!index){
        res.send("Employees cant be deleted as the there are not existing in the records");
        return;
    }

    employees.splice(index,1);
    res.send(`Employee with the id ${id} has been deleted successfully`);
});