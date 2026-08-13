const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Product{
    constructor(name, price, qty){
        this.name = name;
        this.price = price;
        this.qty = qty;
    }
}

let products = [];

function calSubTotal(){
    let subtotal = 0;

    products.forEach(prod => {
        subtotal += prod.price * prod.qty;
    });
    
    return subtotal;
}

function calGST(subtotal){
    let gstRate = 18;
    let gst = (subtotal * gstRate) / 100;
    return gst;
}

function calDisc(subtotal){
    let disc = 0;
    if(subtotal >= 1000){
        disc = (subtotal * 10) / 100;
    }
    return disc;
}

function displayBill(){
    let subtotal = calSubTotal();
    let gst = calGST(subtotal);
    let disc = calDisc(subtotal);

    let finalAmt = subtotal + gst - disc;

    console.log("\n --- Customer Bill ---");
    products.forEach(prod => {
        let total = prod.price * prod.qty;
        console.log(`${prod.name} | Price: ₹${prod.price} | Qty: ${prod.qty} | ToTal: ${total}`);
    });
    console.log("\nSubtotal: ₹" + subtotal);
    console.log("GST (18%): ₹" + gst);
    console.log("Discount: ₹" + disc);
    console.log("--------------------------");
    console.log("Final Payable Amount: ₹" + finalAmt);
    rl.close();
}

function getProduct(i, count){
    if(i == count){
        displayBill();
        return;
    }
    console.log(`\n Product ${i + 1}`);
    rl.question("Enter the name of the Product: ", (name) => {
        rl.question("Enter the price of the product: ", (price) => {
            rl.question("Enter the Quantity of the Product: ", (qty) => {
                let nprice = Number(price);
                let nqty = Number(qty);
                let tempProduct = new Product(name, nprice, nqty);
                products.push(tempProduct);

                // recursion
                getProduct(i+1, count);
            });
        });
    });
}

rl.question("Enter the number of product you want to enter: ", (n) => {
    let count = Number(n);
    getProduct(0, count);
});
