const http = require('http');
const fs = require('fs');
const path = require('path');

const questions = [
    {
        id: 1,
        question: "Which is the Best Programming Language?",
        options: ["Python", "Java", "C++", "JavaScript"],
        answer: "JavaScript"
    },
    {
        id: 2,
        question: "Which Programming Language is used for Data Science and AI/ML?",
        options: ["Java", "C++", "Python", "JavaScript"],
        answer: "Python"
    },
    {
        id: 3,
        question: "Which Google Framework is Used for the Mobile App development?",
        options: ["React Native", "Flutter", "Ionic", "Angular"],
        answer: "Flutter"
    },
    {
        id: 4,
        question: "Which is language used for Enterprise Application",
        options: ["Python", "Java", "C++", "JavaScript"],
        answer: "Java"
    }
]


const server = http.createServer((req, res) => {
    if(req.url === "/"){
        let html = fs.readFileSync(
            path.join(__dirname, "40f.html"),"utf-8"
        );

        // creating html for questions
        let questionHTML = "";
        questions.forEach((q) => {
            questionHTML += `
                <h3>${q.id}. ${q.question}</h3>

                ${q.options.map(option => `
                    <input type="radio" 
                           name="q${q.id}" 
                           value="${option}">
                    ${option}
                    <br>
                `).join("")}

                <br>
            `;
        });

        html = html.replace(
            '<div id="questions"></div>',
            `<div id="questions">${questionHTML}</div>`
        );
        html = html.replace(
            '<script>',
            `<script>const questions = ${JSON.stringify(questions)};`
        )


        res.writeHead(200, {
            "Content-type":"text/html"
        });
        res.end(html);
    }
    else if(req.url === "/submit" && req.method === "POST"){
        let body = "";

    }
});

server.listen(3001, () => {
    console.log("Server Running on localhost:3001");
});