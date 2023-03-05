let bodyParser = require("body-parser");
let express = require("express");
let flash = require("express-flash");
let session = require("express-session");
let app = express();
let cookieParser = require("cookie-parser");

app.set('view engine', 'ejs');

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//parse application/json
app.use(bodyParser.json());

app.use(cookieParser("nodejs"));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.use(flash());

app.get("/", (req, res) => {
    res.render("index")
});

app.post("/form", (req, res) => {
    let { email, nome, pontos } = req.body;
    let emailError;
    let nomeError;
    let pontosError;

    if (email == "" || email == undefined) {
        emailError = "Insira um email válido";
    }
    if (nome == "" || nome == undefined) {
        nomeError = "Insira um nome válido";
    }

    if (pontos < 20 || pontos == undefined) {
        pontosError = "Insira pontos válidos";
    }

    if (emailError != undefined || pontosError != undefined || nomeError != undefined) {
        res.redirect("/");
    } else {
        res.send("Sem erros de validação.");
    }
});

app.listen(5678, (req, res) => {
    console.log("Servidor rodando!");
});