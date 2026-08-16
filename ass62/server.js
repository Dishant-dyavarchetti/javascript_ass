const express = require("express");

const app = express();

app.get("/product", (req, res) => {

    let product = {
        id: 101,
        name: "Laptop",
        price: 50000
    };

    res.json(product);
});

app.listen(3001, () => {
    console.log("Server running at http://localhost:3001");
});