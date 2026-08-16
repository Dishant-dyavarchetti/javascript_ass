const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Product {

    constructor(id, name, price, stock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    display() {
        console.log(
            `ID: ${this.id}, Name: ${this.name}, Price: ₹${this.price}, Stock: ${this.stock}`
        );
    }
}

let products = [];

function findProduct(id) {
    return products.find(product => product.id === id);
}

function menu() {

    console.log("\n===== Product Inventory Management =====");
    console.log("1. Add Product");
    console.log("2. Update Stock");
    console.log("3. Search Product");
    console.log("4. Delete Product");
    console.log("5. Generate Inventory Report");
    console.log("6. Exit");

    rl.question("Enter your choice: ", function(choice) {

        switch (choice) {

            case "1":
                addProduct();
                break;

            case "2":
                updateStock();
                break;

            case "3":
                searchProduct();
                break;

            case "4":
                deleteProduct();
                break;

            case "5":
                inventoryReport();
                break;

            case "6":
                console.log("Program terminated.");
                rl.close();
                break;

            default:
                console.log("Invalid choice!");
                menu();
        }
    });
}

function addProduct() {

    rl.question("Enter Product ID: ", function(id) {

        if (findProduct(id)) {
            console.log("Product already exists.");
            menu();
            return;
        }

        rl.question("Enter Product Name: ", function(name) {

            rl.question("Enter Product Price: ", function(price) {

                rl.question("Enter Stock Quantity: ", function(stock) {

                    price = Number(price);
                    stock = Number(stock);

                    if (isNaN(price) || isNaN(stock) ||
                        price < 0 || stock < 0) {

                        console.log("Invalid price or stock.");
                        menu();
                        return;
                    }

                    let product = new Product(
                        id,
                        name,
                        price,
                        stock
                    );

                    products.push(product);

                    console.log("Product added successfully.");

                    menu();
                });
            });
        });
    });
}

function updateStock() {

    rl.question("Enter Product ID: ", function(id) {

        let product = findProduct(id);

        if (!product) {

            console.log("Product not found.");
            menu();
            return;
        }

        rl.question(
            "Enter new stock quantity: ",
            function(stock) {

                stock = Number(stock);

                if (isNaN(stock) || stock < 0) {

                    console.log("Invalid stock quantity.");

                } else {

                    product.stock = stock;

                    console.log("Stock updated successfully.");
                }

                menu();
            }
        );
    });
}

function searchProduct() {

    rl.question("Enter Product ID or Name: ", function(search) {

        let product = products.find(
            product =>
                product.id === search ||
                product.name.toLowerCase() === search.toLowerCase()
        );

        if (product) {

            console.log("\nProduct Found:");
            product.display();

        } else {

            console.log("Product not found.");
        }

        menu();
    });
}

function deleteProduct() {

    rl.question("Enter Product ID to delete: ", function(id) {

        let index = products.findIndex(
            product => product.id === id
        );

        if (index !== -1) {

            products.splice(index, 1);

            console.log("Product deleted successfully.");

        } else {

            console.log("Product not found.");
        }

        menu();
    });
}

function inventoryReport() {

    console.log("\n===== Inventory Report =====");

    if (products.length === 0) {

        console.log("No products available.");

        menu();
        return;
    }

    let totalProducts = products.length;
    let totalItems = 0;
    let totalValue = 0;

    products.forEach(product => {

        totalItems += product.stock;

        totalValue += product.price * product.stock;

        product.display();
    });

    console.log("\n===== Summary =====");
    console.log("Total Products:", totalProducts);
    console.log("Total Items:", totalItems);
    console.log("Total Inventory Value: ₹" + totalValue);

    menu();
}

menu();
