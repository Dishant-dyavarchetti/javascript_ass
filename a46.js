const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

class Consumer{
    constructor(id, name, units, bill){
        this.id = id;
        this.name = name;
        this.units = units;
        this.bill = bill;
    }
}

let consumers = [];

function calBill(units){
    let bill = 0;
    if(units <= 100){
        bill = units * 1.5;
    }
    else if(units <= 250){
        bill = (100 * 1.5) +
                ((units - 100) * 2.5);
    }
    else if(units <= 350){
        bill = (100 * 1.5) +
                (150 * 2.5) +
                ((units - 250) * 4);
    }
    else{
        bill = (100 * 1.5) +
                (100 * 2.5) +
                (100 * 4) +
                ((units - 300) * 5);
    }
    return bill;
}

function displayConsumers(){
    console.log("\n ----Consumer Details ----");
    consumers.forEach(consumer => {
        console.log(`Consumer ID: ${consumer.id}`);
        console.log(`Name: ${consumer.name}`);
        console.log(`Unit Consumed: ${consumer.units}`);
        console.log(`Total Bill: ${consumer.bill}`);
    });

    rl.close();
}

function getConsumers(i, count){
    if(i == count){
        displayConsumers();
        return;
    }

    console.log("\nConsumer " + (i + 1));
    rl.question("Enter the id of the Consumer: ", (id) => {
        rl.question("Enter the name of the consumer: ", (name) => {
            rl.question("Enter the Total Units Consumed by the Consumer: ", (units) => {
                units = Number(units);
                let bill = calBill(units);

                let tempConsumer = new Consumer(id, name, units, bill);
                consumers.push(tempConsumer);

                getConsumers(i + 1, count);
            });
        });
    });
}

rl.question("Enter Number of Consumers: ", function(n){
    let count = Number(n);
    getConsumers(0, count);
});
