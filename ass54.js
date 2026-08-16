
// Type of provider (When the data is availble they provide using promise using resolve)
// if data is not received by any means then using reject they shows that they cant provide the data
let promise = new Promise((resolve, reject) => {
    let cond = false;
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
});