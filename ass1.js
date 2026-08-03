let student = {
    roll_no: 10,
    name: "Dishant",
    marks: [
        23, 45, 56, 89, 76
    ],
};

function totalMarks(stud){
    let total = 0;
    // for(i=0;i<stud.marks.length;i++){
    //     total = total + stud.marks[i]
    // }
    stud.marks.forEach(element => {
        total += element;
    });
    return total;
}

function percent(stud){
    return totalMarks(stud) / 500 * 100
}

function grade(stud){
    let grade = "";
    if(percent > 55){
        grade = "D";
    }
    else if(percent > 65){
        grade = "C";
    }
    else if(percent > 75){
        grade = "B";
    }
    else if(percent > 85){
        grade = "A";
    }
    else{
        grade = "F";
    }
    return grade;
}

console.log(totalMarks(student));
console.log(percent(student));
console.log(grade(student));