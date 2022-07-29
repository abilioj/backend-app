const app = require("express")();
const consign = require("consign");
const db = require("./config/conn.js")

const port = 3000;

app.db = db;//injetatando as funcoes de persitencia de Banco globalmente
  
consign()
.include("./config/passport.js")//injetando a funcoes que valida a autentificação nas rota
.then("./config/middlewares.js")//injetando as minhas middlewares na api app
.then("./api/validation.js")//injetatando funcoes globalmente
.then("./api")
.then("./config/routes.js")//injetando as minha rotas
.into(app)

app.listen(port, () => {
    console.log("api executando...");
});