function task1(){
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Task 1 Completed");
            resolve();
        }, 1000);
    });

    return promise;
}

function task2(){
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Task 2 Completed");
            resolve();
        }, 2000);
    });

    return promise;
}

function task3(){
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Task 3 didnt Completed");
            reject(new Error("It couldnt complete the task 3"));
        }, 1000);
    });

    return promise;
}

async function main(){
    try{
        await task1();

        await task2();

        await task3();

        console.log("All Task Completed");
    }
    catch(error){
        console.log(error.message);
    }
    

    
}
main();
