
let promise = new Promise((resolve, reject) => {
    let cond = true;
    if(cond){
        setTimeout(() => {
            resolve("Done");
        }, 1000);
    }else{
        setTimeout(() => {
            reject(new Error("Sorry Man, Cant happen"));
        }, 1000);
    }
});

promise.then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error.message);
}).finally(() => {
    console.log("This is the going to execute no matter what");
});