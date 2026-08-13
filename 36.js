class Payment{
    pay(amt){
        console.log(`Paid $${amt}`);
    }
}

class CreditCard extends Payment{
    // method overriding
    pay(amt){
        console.log(`Paid $${amt} using the Credit Card`);
    }
}

class UPI extends Payment{
    // Method Overriding
    pay(amt){
        console.log(`Paid $${amt} using the UPI`);
    }
}

class Cash extends Payment{
    pay(amt){
        console.log(`Paid $${amt} in cash`);
    }
}

const payments = [
    new CreditCard(),
    new UPI(),
    new Cash()
];

for(const payment of payments){
    payment.pay(555);
}
