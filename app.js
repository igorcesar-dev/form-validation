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
    let emailError = req.flash("emailError");
    let nomeError = req.flash("nomeError");
    let pontosError = req.flash("pontosError");

    let email = req.flash("email");
    let nome = req.flash("nome");
    let pontos = req.flash("pontos");

    /* if(emailError != undefined){
        if(emailError.length == 0){
            emailError = undefined;
        }
    } */

    emailError = (emailError == undefined || emailError.length == 0)? undefined : emailError;
    nomeError = (nomeError == undefined || nomeError.length == 0)? undefined : nomeError;
    pontosError = (pontosError == undefined || pontosError.length == 0)? undefined : pontosError;

    email = (email == undefined || email.length == 0)? "" : email;
    nome = (nome == undefined || nome.length == 0)? "" : nome;
    pontos = (pontos == undefined || pontos.length == 0)? "" : pontos;

    res.render("index", {emailError, nomeError, pontosError, email: email, nome: nome, pontos: pontos})
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
        req.flash("emailError", emailError);
        req.flash("nomeError", nomeError);
        req.flash("pontosError", pontosError);

        req.flash("email", email);
        req.flash("nome", nome);
        req.flash("pontos", pontos);
        res.redirect("/");
    } else {
        res.send("Sem erros de validação.");
    }
});

app.listen(5678, (req, res) => {
    console.log("Servidor rodando!");
});