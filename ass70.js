const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class BankAccount {

    constructor(accountNo, name, balance) {
        this.accountNo = accountNo;
        this.name = name;
        this.balance = balance;
        this.transactions = [];

        this.transactions.push(
            `Account created with balance ₹${balance}`
        );
    }


    deposit(amount) {

        this.balance += amount;

        this.transactions.push(
            `Deposited ₹${amount}`
        );

        console.log(`₹${amount} deposited successfully.`);
    }


    withdraw(amount) {

        if (amount > this.balance) {

            console.log("Insufficient balance.");

        } else {

            this.balance -= amount;

            this.transactions.push(
                `Withdrawn ₹${amount}`
            );

            console.log(`₹${amount} withdrawn successfully.`);
        }
    }


    showBalance() {

        console.log(`Current Balance: ₹${this.balance}`);
    }


    showHistory() {

        console.log("\n===== Transaction History =====");

        if (this.transactions.length === 0) {

            console.log("No transactions found.");

        } else {

            this.transactions.forEach((transaction, index) => {

                console.log(`${index + 1}. ${transaction}`);

            });
        }
    }
}

let accounts = [];

function findAccount(accountNo) {

    return accounts.find(
        account => account.accountNo === accountNo
    );
}

function menu() {

    console.log("\n===== Bank Account Management System =====");
    console.log("1. Create Account");
    console.log("2. Deposit");
    console.log("3. Withdraw");
    console.log("4. Balance Inquiry");
    console.log("5. Transaction History");
    console.log("6. Exit");

    rl.question("Enter your choice: ", function(choice) {

        switch (choice) {

            case "1":
                createAccount();
                break;

            case "2":
                depositMoney();
                break;

            case "3":
                withdrawMoney();
                break;

            case "4":
                balanceInquiry();
                break;

            case "5":
                transactionHistory();
                break;

            case "6":
                console.log("Thank you for using the Bank System.");
                rl.close();
                break;

            default:
                console.log("Invalid choice!");
                menu();
        }
    });
}

function createAccount() {

    rl.question("Enter Account Number: ", function(accountNo) {

        if (findAccount(accountNo)) {

            console.log("Account already exists.");
            menu();
            return;
        }

        rl.question("Enter Account Holder Name: ", function(name) {

            rl.question("Enter Initial Balance: ", function(balance) {

                balance = Number(balance);

                if (balance < 0 || isNaN(balance)) {

                    console.log("Invalid balance.");
                    menu();
                    return;
                }

                let account = new BankAccount(
                    accountNo,
                    name,
                    balance
                );

                accounts.push(account);

                console.log("Account created successfully.");

                menu();
            });
        });
    });
}

function depositMoney() {

    rl.question("Enter Account Number: ", function(accountNo) {

        let account = findAccount(accountNo);

        if (!account) {

            console.log("Account not found.");
            menu();
            return;
        }

        rl.question("Enter amount to deposit: ", function(amount) {

            amount = Number(amount);

            if (amount <= 0 || isNaN(amount)) {

                console.log("Invalid amount.");

            } else {

                account.deposit(amount);
            }

            menu();
        });
    });
}

function withdrawMoney() {

    rl.question("Enter Account Number: ", function(accountNo) {

        let account = findAccount(accountNo);

        if (!account) {

            console.log("Account not found.");
            menu();
            return;
        }

        rl.question("Enter amount to withdraw: ", function(amount) {

            amount = Number(amount);

            if (amount <= 0 || isNaN(amount)) {

                console.log("Invalid amount.");

            } else {

                account.withdraw(amount);
            }

            menu();
        });
    });
}

function balanceInquiry() {

    rl.question("Enter Account Number: ", function(accountNo) {

        let account = findAccount(accountNo);

        if (account) {

            console.log(`\nAccount Holder: ${account.name}`);
            console.log(`Account Number: ${account.accountNo}`);

            account.showBalance();

        } else {

            console.log("Account not found.");
        }

        menu();
    });
}

function transactionHistory() {

    rl.question("Enter Account Number: ", function(accountNo) {

        let account = findAccount(accountNo);

        if (account) {

            console.log(`\nAccount Holder: ${account.name}`);

            account.showHistory();

        } else {

            console.log("Account not found.");
        }

        menu();
    });
}

menu();