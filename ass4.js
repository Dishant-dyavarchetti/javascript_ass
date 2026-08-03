const { read } = require("fs");
const { stdin, stdout } = require("process");

function Book(title, author, price, status = "available"){
    this.title = title;
    this.author = author;
    this.price = price;
    // two state: available, issued (Not Available),
    this.status = status;
}

const { createInterface } = require("readline/promises");

async function main(){
    
    const rl = createInterface({
        input: stdin,
        output: stdout
    });

    let ArrBook = [];
    function _addBook(title, author, price){
        let temp = new Book(title, author, price);
        ArrBook.push(temp);
        return true;
    }

    function _searchBook(input, ele){
        let flag = false;
        let input_trimmed = ele.trim().toLowerCase();
        // searching book by title
        if(input == "1"){
            
            const book = ArrBook.find(element => element.title.trim().toLowerCase() === input_trimmed);
            if(book){
                console.log(`Book ${ele} found in the library`);
            }else{
                console.log(`Book ${ele} not found in the library`);
            }
        }
        // searching book by author
        // There can be multiple book with same author
        else if(input == "2"){

            const books = ArrBook.filter(element => element.author.trim().toLowerCase() === input_trimmed);
            
            if(books.length !== 0){
                console.log(`These are the books found of author ${ele}`);
                books.forEach(element => {
                    console.log(`${element.title} of ${element.author}`);
                });
            }else{
                console.log(`There are no books found of author ${ele}.`);
            }
        }
    }

    function _issueBook(book_title){
        let flag = false;
        let title = book_title.trim().toLowerCase();
        let book = ArrBook.find(ele => ele.title.trim().toLowerCase() === title);
        if(book && book.status === "available"){
            book.status = "issued";
            console.log("Book found and issued successfully");
        }else{
            console.log("Book cant be found or it is already issued");
        }
        
    }

    function _returnBook(book_title){
        let flag = false;
        let title = book_title.trim().toLowerCase();
        let book = ArrBook.find(ele => ele.title.trim().toLowerCase() === title);
        if(book && book.status === "issued"){
            book.status = "available";
            console.log("Book has been returned..");
        }else{
            console.log("Book is not found in library or is already available in the library");
        }
        
    }

    function _displayAvailBook(){
        console.log("Below are the list of available books....");
        ArrBook.forEach(element => {
            if(element.status === "available"){
                console.log(`${element.title} by ${element.author}`);
            }
        });
    }

    console.log("Library Management System!");
    let run = true;
    while(run){
        console.log(`\n Following are operation you can perform`);
        console.log("1) Add Book");
        console.log("2) Search Book");
        console.log("3) Issue Book");
        console.log("4) Return Book");
        console.log("5) View Available Books");
        console.log("6) Exit the System");
        let choice = await rl.question("Enter the choice between [1-6]: ");

        switch(choice){
            case "1":
                const title = await rl.question("Enter the title of the Book: ");
                const author = await rl.question("Enter the Author of the book: ");
                const price = await rl.question("Enter the price of the Book: ");
                let added = _addBook(title, author, price);
                if(added){
                    console.log(`The book with title ${title} is added successfully in the library`);
                }else{
                    console.log(`The book with title ${title} is not added in the library successfully`);
                }
                break;
            case "2":
                console.log("How you want to search the book: ");
                console.log("1) By Title");
                console.log("2) By Author");
                const input = await rl.question("Enter the input between [1-2]: ");
                const ele = await rl.question("Enter the title or Author of the book: ");
                _searchBook(input, ele);
                break;
            case "3":
                const issInput = await rl.question("Enter the book title you want to issue: ");
                _issueBook(issInput);
                break;
            case "4":
                const retInput = await rl.question("Enter the book title you want to return: ");
                _returnBook(retInput);
                break;
            case "5":
                _displayAvailBook();
                break;
            case "6":
                console.log("Exiting from the systemm...")
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