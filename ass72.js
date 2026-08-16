let cart = [];
const readline = require("readline/promises");
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


async function add() {
    let name = await rl.question("Enter item name:");
    let price = parseFloat(await rl.question("Enter item price:"));
    let quantity = parseInt(await rl.question("Enter quantity:"));

    if (name && price > 0 && quantity > 0) {
        cart.push({
            name: name,
            price: price,
            quantity: quantity
        });

        console.log("Item added successfully.");
    } else {
        console.log("Invalid item details.");
    }
}

async function remove() {
    let name = await rl.question("Enter item name to remove:");

    if (!name) {
        console.log("Invalid item name.");
        return;
    }

    let index = cart.findIndex(
        item => item.name.toLowerCase() === name.toLowerCase()
    );

    if (index !== -1) {
        cart.splice(index, 1);
        console.log("Item removed successfully.");
    } else {
        console.log("Item not found.");
    }
}

async function update() {
    let name = await rl.question("Enter item name to update:");
    let quantity = parseInt(await rl.question("Enter new quantity:"));

    if (!name) {
        console.log("Invalid item name.");
        return;
    }

    let item = cart.find(
        item => item.name.toLowerCase() === name.toLowerCase()
    );

    if (item && quantity > 0) {
        item.quantity = quantity;
        console.log("Quantity updated successfully.");
    } else {
        console.log("Item not found or invalid quantity.");
    }
}

function calculatetotal() {
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    return total;
}

function display() {
    if (cart.length === 0) {
        console.log("Shopping cart is empty.");
        return;
    }

    let summary = "--- PURCHASE SUMMARY ---\n";

    cart.forEach((item, index) => {
        let amount = item.price * item.quantity;

        summary += `${index + 1}. ${item.name} | Price: $${item.price} | `;
        summary += `Quantity: ${item.quantity} | Amount: $${amount}\n`;
    });

    summary += "-------------------------\n";
    summary += `Total Bill: $${calculatetotal()}`;

    console.log(summary);
}



async function main(){
    let choice;

    do {
        choice = await rl.question(
            "===== SHOPPING CART SYSTEM =====\n" +
            "1. Add Item\n" +
            "2. Remove Item\n" +
            "3. Update Quantity\n" +
            "4. Calculate Total Bill\n" +
            "5. Display Purchase Summary\n" +
            "6. Exit\n\n" +
            "Enter your choice:"
        );

        switch (choice.trim()) {
            case "1":
                await add();
                break;

            case "2":
                await remove();
                break;

            case "3":
                await update();
                break;

            case "4":
                console.log("Total Bill: $" + calculatetotal().toFixed(2));
                break;

            case "5":
                display();
                break;

            case "6":
                console.log("Exiting...");
                break;

            default:
                console.log("Invalid choice.");
        }

    } while (choice != "6");
};

main();
