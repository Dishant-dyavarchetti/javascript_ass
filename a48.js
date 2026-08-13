const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let students = [];


/* Calculate class average */
function calculateAverage() {

    let total = 0;

    students.forEach(function(student) {
        total = total + student.marks;
    });

    return total / students.length;
}



function findHighest() {

    let highest = students[0].marks;

    students.forEach(function(student) {

        if (student.marks > highest) {
            highest = student.marks;
        }

    });

    return highest;
}



function findLowest() {

    let lowest = students[0].marks;

    students.forEach(function(student) {

        if (student.marks < lowest) {
            lowest = student.marks;
        }

    });

    return lowest;
}


/* Calculate grade distribution */
function calculateGrades() {

    let gradeA = 0;
    let gradeB = 0;
    let gradeC = 0;
    let gradeD = 0;
    let gradeF = 0;

    students.forEach(function(student) {

        if (student.marks >= 80) {
            gradeA++;
        }
        else if (student.marks >= 60) {
            gradeB++;
        }
        else if (student.marks >= 40) {
            gradeC++;
        }
        else if (student.marks >= 35) {
            gradeD++;
        }
        else {
            gradeF++;
        }

    });

    return {
        A: gradeA,
        B: gradeB,
        C: gradeC,
        D: gradeD,
        F: gradeF
    };
}



function displayReport() {

    let average = calculateAverage();

    let highest = findHighest();

    let lowest = findLowest();

    let grades = calculateGrades();


    console.log("\n----- STUDENT PERFORMANCE REPORT -----");

    students.forEach(function(student) {

        console.log(
            student.name +
            " | Marks: " + student.marks
        );

    });

    console.log("\nClass Average: " + average.toFixed(2));
    console.log("Highest Marks: " + highest);
    console.log("Lowest Marks: " + lowest);

    console.log("\n----- Grade Distribution -----");
    console.log("Grade A: " + grades.A);
    console.log("Grade B: " + grades.B);
    console.log("Grade C: " + grades.C);
    console.log("Grade D: " + grades.D);
    console.log("Grade F: " + grades.F);

    rl.close();
}


/* Take student details */
function getStudent(i, count) {

    if (i == count) {
        displayReport();
        return;
    }

    console.log("\nStudent " + (i + 1));

    rl.question("Enter Student Name: ", function(name) {

        rl.question("Enter Marks: ", function(marks) {

            students.push({
                name: name,
                marks: Number(marks)
            });

            getStudent(i + 1, count);

        });

    });

}



rl.question("Enter number of students: ", function(n) {

    let count = Number(n);

    getStudent(0, count);

});