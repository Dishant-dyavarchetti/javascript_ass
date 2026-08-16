const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


class Student {
    constructor(rollNo, name, sem, cgpa) {
        this.rollNo = rollNo;
        this.name = name;
        this.sem = sem;
        this.cgpa = cgpa;
    }
}


let students = [];


function showMenu() {

    console.log("\n--- Student Management System ---");

    console.log("1. Add Student");
    console.log("2. Search Student");
    console.log("3. Update Student");
    console.log("4. Delete Student");
    console.log("5. Display All Students");
    console.log("6. Exit");


    rl.question("Enter your choice: ", (choice) => {

        switch (choice) {

            case "1":
                addStudent();
                break;

            case "2":
                searchStudent();
                break;

            case "3":
                updateStudent();
                break;

            case "4":
                deleteStudent();
                break;

            case "5":
                displayStudents();
                break;

            case "6":
                console.log("Program Ended");
                rl.close();
                break;

            default:
                console.log("Invalid Choice");
                showMenu();
        }

    });
}


// Add Student

function addStudent() {

    rl.question("Enter Roll Number: ", (roll) => {

        rl.question("Enter Name: ", (name) => {

            rl.question("Enter Semester: ", (sem) => {

                rl.question("Enter CGPA: ", (cgpa) => {

                    let student = new Student(
                        Number(roll),
                        name,
                        Number(sem),
                        Number(cgpa)
                    );

                    students.push(student);

                    console.log("Student Added Successfully");

                    showMenu();

                });

            });

        });

    });

}


// Search Student

function searchStudent() {

    rl.question("Enter Roll Number to Search: ", (roll) => {

        let student = students.find(
            (student) => student.rollNo === Number(roll)
        );

        if (student) {

            console.log("\nStudent Found");

            console.log("Roll No:", student.rollNo);
            console.log("Name:", student.name);
            console.log("Semester:", student.sem);
            console.log("CGPA:", student.cgpa);

        } else {

            console.log("Student Not Found");

        }

        showMenu();

    });

}


// Update Student

function updateStudent() {

    rl.question("Enter Roll Number to Update: ", (roll) => {

        let student = students.find(
            (student) => student.rollNo === Number(roll)
        );

        if (!student) {

            console.log("Student Not Found");

            showMenu();
            return;
        }

        rl.question("Enter New Name: ", (name) => {

            rl.question("Enter New Semester: ", (sem) => {

                rl.question("Enter New CGPA: ", (cgpa) => {

                    student.name = name;
                    student.sem = Number(sem);
                    student.cgpa = Number(cgpa);

                    console.log("Student Updated Successfully");

                    showMenu();

                });

            });

        });

    });

}


// Delete Student

function deleteStudent() {

    rl.question("Enter Roll Number to Delete: ", (roll) => {

        let index = students.findIndex(
            (student) => student.rollNo === Number(roll)
        );

        if (index === -1) {

            console.log("Student Not Found");

        } else {

            students.splice(index, 1);

            console.log("Student Deleted Successfully");

        }

        showMenu();

    });

}


// Display Students

function displayStudents() {

    if (students.length === 0) {

        console.log("No Student Records Available");

    } else {

        console.log("\n--- Student Records ---");

        students.forEach((student) => {

            console.log("\nRoll No:", student.rollNo);
            console.log("Name:", student.name);
            console.log("Semester:", student.sem);
            console.log("CGPA:", student.cgpa);

        });

    }

    showMenu();

}


// Start Program

showMenu();