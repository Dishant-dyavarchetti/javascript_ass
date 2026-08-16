function prom(){
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            let cond = false;
            if(cond){
                resolve("Data received");
            }else{
                reject(new Error("Data cant be Receive"));
            }
        }, 1000);
    });
    return promise;
}

// way 1
// let result = await prom();
// console.log(result);

// way 2 (To avoid the warning of the ES or CommonJS)
async function main(){
    try{
        let result = await prom();
        console.log(result);
    }catch(error){
        console.log(error.message);
    }
}

// calling main function
main();