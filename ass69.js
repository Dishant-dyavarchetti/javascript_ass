//69


const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
class Book {

    constructor(id, title, author) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.issued = false;
    }

    display() {
        console.log(
            `ID: ${this.id}, Title: ${this.title}, Author: ${this.author}`
        );
    }
}

let books = [];

function menu() {

    console.log("\n===== Library Management System =====");
    console.log("1. Add Book");
    console.log("2. Search Book");
    console.log("3. Issue Book");
    console.log("4. Return Book");
    console.log("5. Display Available Books");
    console.log("6. Exit");

    rl.question("Enter your choice: ", function(choice) {

        switch (choice) {

            case "1":
                addBook();
                break;

            case "2":
                searchBook();
                break;

            case "3":
                issueBook();
                break;

            case "4":
                returnBook();
                break;

            case "5":
                displayAvailableBooks();
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
function addBook() {

    rl.question("Enter Book ID: ", function(id) {

        rl.question("Enter Book Title: ", function(title) {

            rl.question("Enter Author Name: ", function(author) {

                let book = new Book(id, title, author);

                books.push(book);

                console.log("Book added successfully.");

                menu();
            });
        });
    });
}

function searchBook() {

    rl.question("Enter Book ID or Title to search: ", function(search) {

        let book = books.find(
            book =>
                book.id === search ||
                book.title.toLowerCase() === search.toLowerCase()
        );

        if (book) {

            console.log("\nBook Found:");
            book.display();

            if (book.issued) {
                console.log("Status: Issued");
            } else {
                console.log("Status: Available");
            }

        } else {

            console.log("Book not found.");
        }

        menu();
    });
}

function issueBook() {

    rl.question("Enter Book ID to issue: ", function(id) {

        let book = books.find(book => book.id === id);

        if (!book) {

            console.log("Book not found.");

        } else if (book.issued) {

            console.log("Book is already issued.");

        } else {

            book.issued = true;

            console.log("Book issued successfully.");
        }

        menu();
    });
}

function returnBook() {

    rl.question("Enter Book ID to return: ", function(id) {

        let book = books.find(book => book.id === id);

        if (!book) {

            console.log("Book not found.");

        } else if (!book.issued) {

            console.log("Book is already available.");

        } else {

            book.issued = false;

            console.log("Book returned successfully.");
        }

        menu();
    });
}

function displayAvailableBooks() {

    let availableBooks = books.filter(book => book.issued === false);

    if (availableBooks.length === 0) {

        console.log("No books are currently available.");

    } else {

        console.log("\n===== Available Books =====");

        availableBooks.forEach(book => {
            book.display();
        });
    }

    menu();
}

menu();