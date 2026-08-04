function Student(roll, name, std, marks){
    this.roll = roll;
    this.name = name;
    this.std = std;
    this.marks = marks;
}

let listStudents = [];

function _createStudentObj(roll, name, std, marks){
    let temp = new Student(roll, name, std, marks);
    if(temp){
        listStudents.push(temp);
        return true;
    }else{
        return false;
    }
}

function _readStudent(input, name = null){
    // read all students
    if(input === "1"){
        console.log("---All Students Details---")
        listStudents.forEach((student) => {
            console.log(`roll No: ${student.roll} \nstudent Name: ${student.name} \nStudent Grade: ${student.std} \nStudent Marks ${student.marks} \n`);
        });
    }
    // read specific Student
    else{
        let sim_name = name.trim().toLowerCase();
        let student = listStudents.find(stu => stu.name.trim().toLowerCase() === sim_name);
        if(student){
            console.log(`---${name} Details---`);
            console.log(`Student RollNo: ${student.roll} \n Student Name: ${student.name} \nStudent Grade: ${student.std} \nStudent Marks: ${student.marks}`);
        }else{
            console.log("Student Not Found in the List...");
        }
    }
}

function _updateStudentDetails(roll, det){
    let newRoll = roll.trim().toLowerCase();
    let upStud = listStudents.findIndex(stud => stud.roll.trim().toLowerCase() === newRoll);
    if(upStud !== -1){
        listStudents[upStud] = det;
        // console.log(`Student ${upStud.name} updated Successfully...`);
        return true;
    }else{
        return false;
    }
    
}

function _removeStudent(roll){
    let rollNo = roll.trim().toLowerCase();
    let student = listStudents.findIndex(stud => stud.roll.trim().toLowerCase() === rollNo);
    if(student !== -1){
        listStudents.splice(student, 1);
        return true;
    }else{
        return false;
    }
}

// const { createInterface } = require("readline");
let readline = require("readline/promises");

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main(){
    
    let run = true;
    while(run){
        console.log("CRUD Operations for Student List...");
        console.log("1) Create Student Object and add");
        console.log("2) Read Student Details");
        console.log("3) Update the details of the student");
        console.log("4) Delete the data of the Student");
        console.log("5) Exit");
        let choice = await rl.question("Enter the Choice Between [1-5]: ");
        switch(choice){
            case "1":
                let roll = await rl.question("Enter the Roll No of the student: ");
                let name = await rl.question("Enter the Name of the Student: ");
                let grade = await rl.question("Enter the grade of the student: ");
                let marks = await rl.question("Enter the marks of the student: ");

                let res = _createStudentObj(roll, name, grade, marks);
                if(res){
                    console.log("The student details is Recorded Successfully...");
                }else{
                    console.log("The Student Details has not been Recorded Successfully");
                }
                break;
            case "2":
                console.log("Enter by which way you want the Data: ");
                console.log("1) All students");
                console.log("2) Particular Student");
                let cho2 = await rl.question("Enter the choice between [1-2]: ");
                if(cho2 === "2"){
                    let det = await rl.question("Enter the student name: ");
                    _readStudent(cho2, det);
                }else{
                    _readStudent(cho2);
                }
                break;
            case "3":
                let cho3 = await rl.question("Enter the Roll number for which you want to Update the Details: ");
                if(cho3){
                    let roll = await rl.question("Enter the Roll No of the student: ");
                    let name = await rl.question("Enter the Name of the Student: ");
                    let grade = await rl.question("Enter the grade of the student: ");
                    let marks = await rl.question("Enter the marks of the student: ");
                    let upstud = new Student(roll, name, grade, marks);
                    let res2 = _updateStudentDetails(cho3, upstud);
                    if(res2){
                        console.log("Student details are successfully updated");
                    }else{
                        console.log("Student Detailed are not updated");
                    }
                }
                break;
            case "4":
                let cho4 = await rl.question("ENTER THE ROLL NO OF THE STUDENT: ");
                if(cho4){
                    let res = _removeStudent(cho4);
                    if(res){
                        console.log(`Student removed successfully...`);
                    }else{
                        console.log(`Student didnt removed successfully...`);
                    }
                    
                }
                break;
            case "5":
                console.log("Exiting from program...");
                run = false;
                break;
            default:
                console.log("Enter correct input...");
                break;
        }
    } 
    rl.close();
};

main();