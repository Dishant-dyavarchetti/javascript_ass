const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

function calTotal(marks){
    let total = 0;
    return marks.maths + marks.science + marks.english;
}

function calPerc(total){
    return (total / 300) * 100;
}

function calGrade(perc){
    if(perc >= 80){
        return "A";
    }
    else if(perc >= 60){
        return "B";
    }
    else if(perc >= 40){
        return "C";
    }else{
        return "F";
    }
}

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post("/report", (req, res) => {
    let name = req.body.stud_name;
    let marks = {
        maths: Number(req.body.maths_mks),
        science: Number(req.body.sci_mks),
        english: Number(req.body.eng_mks)
    };

    let total = calTotal(marks);
    let perc = calPerc(total);
    let grade = calGrade(perc);

    res.redirect(
        `report.html?stud_name=${name}`+
        `&maths_mks=${marks.maths}`+
        `&sci_mks=${marks.science}`+
        `&eng_mks=${marks.english}`+
        `&total=${total}`+
        `&perc=${perc}`+
        `&grade=${grade}`
    );
});

app.listen(3001, () => {
    console.log("Server Started at http://localhost:3001");
});