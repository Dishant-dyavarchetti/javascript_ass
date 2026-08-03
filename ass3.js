class BankAccount{
    constructor(accNo, accHolderName, accBalance = 0){
        this.accNo = accNo;
        this.accHolderName = accHolderName;
        this.accBalance = accBalance;
        this.transacHist = [];

        if(accBalance > 0){
            this._recordTrasaction("Deposit", accBalance, "Initial Deposit");
        }
    }

    _recordTrasaction(type, bal, description = " "){
        const transaction = {
            timestamp: new Date().toISOString(),
            type: type,
            amount: bal,
            balanceAfter: this.accBalance,
            description: description
        };

        this.transacHist.push(transaction);
    }
    deposit(depAmt){
        if(depAmt <= 0){
            console.log("Enter Correct Amount...");
            return;
        }else{
            this.accBalance += depAmt;
            this._recordTrasaction("Deposit", depAmt, "Deposited by the User");
            // console.log(`${depAmt} deposited in the Account Successfully...`);
            return this.accBalance;
        }
    }

    withdrawn(withDrawAmt){
        if(withDrawAmt < 0){
            console.log("The Amount should be positive");
        }
        if(withDrawAmt > this.accBalance){
            console.log("The Amount you enter is more than amount present in the account...");
            return;
        }else{
            this.accBalance -= withDrawAmt;
            this._recordTrasaction("Withdrawn", withDrawAmt, "Amount Withdrawn by the user");
            return this.accBalance;
        }
    }

    displayDetails(){
        console.log("\nBank Account Details...");
        console.log("\nAccount Number:" + this.accNo);
        console.log("\nAccount Holder Name: " + this.accHolderName);
        console.log("\nAccount Balance: " + this.accBalance);
    }

    displayTracHist(){
        // using Spread operator
        return [...this.transacHist];
    }
}

const { stdin, stdout } = require("process");
const { createInterface } = require("readline/promises");

async function main(){
    const rl = createInterface({
        input: stdin,
        output: stdout
    });

    console.log("Bank Account System!");
    const accNo = await rl.question("Enter the Account Number of AccountHolder: ");
    const name = await rl.question("Enter the name of the AccountHolder: ");
    const balance = Number(await rl.question("Enter the Balance That should be added in the Account: "));

    const account = new BankAccount(accNo, name, balance);

    let run = true;
    while(run){
        console.log(`\n--- ${account.accHolderName}'s Account Menu ---`);
        console.log("1. Check Balance");
        console.log("2. Deposit Money");
        console.log("3. Withdraw Money");
        console.log("4. View Transaction History");
        console.log("5. Exit");

        const choice = (await rl.question("Enter the Choice Between 1 to 5: ")).trim();
        switch(choice){
            case "1":
                account.displayDetails();
                break;
            case "2":
                let deposit = Number(await rl.question("Enter the amount you want to deposit in the bank Account: "));
                let newBal = account.deposit(deposit);
                console.log(`${deposit} amount deposited successfully in the acc with Balance ${newBal}`);
                break;
            case "3":
                let withdrawn = Number(await rl.question("Enter the amount you want to withdraw from the account: "));
                let balAfter = account.withdrawn(withdrawn);
                console.log(`${withdrawn} amount withdrawn from the account successfully with Balance remaining ${balAfter}`);
                break;
            case "4":
                const accHistory = account.displayTracHist();
                console.log(accHistory);
                console.log(`\n Total Number Transaction Performed: ${accHistory.length}`);
                break;
            case "5":
                console.log("\nThank you, exiting.....");
                run = false;
                break;
            default:
                console.log("Please enter a valid choice between 1 and 5.");
                break;
        }
    }
    rl.close();
}


main();
