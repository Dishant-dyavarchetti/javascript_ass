// set collections

const numbers = new Set();

numbers.add(10);
numbers.add(20);
numbers.add(30);
numbers.add(20);
numbers.delete(10);

console.log(numbers.has(50));
console.log(numbers.size);

console.log(numbers);
numbers.clear();

// Map collection data structure

const student = new Map();

// another way
// const student = new Map([
    // ["name","Dishant"],
    // ["age",21],
    // ["city","Ahmedabad"]
// ])

student.set("Name","Dishant");
student.set("age", 21);
student.set("city","Ahmedabad");

for(const [key, val] of student){
    console.log(key, val);
}

