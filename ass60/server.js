const express = require('express');
const path = require('path');
const app = express();

class Student{
    constructor(rollNo, name, sem, cgpa){
        this.rollNo = rollNo;
        this.name = name;
        this.sem = sem;
        this.cgpa = cgpa;
    }
}

let students = [];

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// create Student Record
app.post("/create", (req, res) => {
    let roll = Number(req.body.roll);
    console.log(typeof(roll));
    let name = req.body.name;
    console.log(typeof(name));
    let sem = Number(req.body.sem);
    console.log(typeof(sem));
    let cgpa = Number(req.body.cgpa);
    console.log(typeof(cgpa));

    let tempObj = new Student(roll, name, sem, cgpa);
    students.push(tempObj);

    console.log(students);
    res.send(`
        <h1>Student Record Created Successfully</h1>
        <a href="/">Go Back</a><br><br>
        <a href="/view">View All Records</a><br><br>
        <a href="/update">Update Record</a><br><br>
        <a href="/delete">Delete Record</a><br><br>
    `);
});

// sending the html file details
app.get("/view",(req, res) => {
    res.sendFile(path.join(__dirname, "student.html"));

    
});

// sending the data of the student
app.get("/students", (req, res) => {
    res.send(students);
})

app.get("/delete",(req, res) => {
    res.sendFile(path.join(__dirname, "delStud.html"));
})

// geting the data from the student
app.delete("/delete/:roll", (req, res) => {
    let roll = Number(req.params.roll);
    let index = students.findIndex((stud) => roll === stud.rollNo);
    if(index === -1){
        res.send("Student Not Found");
    }
    students.splice(index, 1);
    res.send("Student Deleted Successfully");
});

app.get("/update", (req, res) => {
    res.sendFile(path.join(__dirname, "updateStud.html"));
});

app.put("/update/:roll", (req,res) => {
    let roll = Number(req.params.roll);
    let student = students.find((stud) => roll === stud.rollNo);

    if(!student){
        res.send("student Not Found");
        return;
    }
    student.name = req.body.name;
    student.sem = req.body.sem;
    student.cgpa = req.body.cgpa;

    res.send(`
        <h1>Student Record Updated Successfully</h1>
        <a href="/">Go Back</a><br><br>
        <a href="/view">View All Records</a><br><br>
        <a href="/delete">Delete Record</a><br><br>
    `);

});

app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});