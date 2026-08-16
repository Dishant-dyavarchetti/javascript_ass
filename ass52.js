function displayResult(){
    console.log("Operation completed Successfully");
}

function calSum(a, b, callback){
    let sum  = a + b;
    console.log("Sum: " + sum);
    callback();
}

calSum(10,20, displayResult);

