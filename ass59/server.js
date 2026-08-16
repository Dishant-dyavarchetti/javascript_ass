const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({extended:true}));

app.get("/product", (req,res) => {
    let product = {
        id: 101,
        name: "Samsung S24FE",
        price: 30000,
        category: "SmartPhone"
    };

    res.send(product);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});