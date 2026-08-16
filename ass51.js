const { json } = require("express")

let student = {
    id: 101,
    Name: "Dishant",
    Semester: 7,
    CGPA: 8.6
}

let JSON_obj = JSON.stringify(student);

console.log(`Json Format:  ${JSON_obj}`);

// convert back to object from JSON
let object = JSON.parse(JSON_obj);

console.log("\nJS Object")
console.log(object);