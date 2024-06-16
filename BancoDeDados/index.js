const express = require("express");
const mysql = require("mysql");
const path = require("path");
const porta = 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const basepath = path.join(__dirname, "templates");

app.get("/app", (req, res) => {
  res.sendFile(`${basepath}/app.html`);
});

app.post("/enviar-dados/livros", (req, res) => {
  const titulos = req.body.titulos;
  const paginas = req.body.paginas;

  const sql = `INSERT INTO livros (titulos, paginas) VALUES ('${titulos}', '${paginas}')`;

  conn.query(sql, function (err) {
    if (err) {
      console.log(`ERRO: ${err}`);
      return;
    }

    res.redirect("/");
  });
});

app.get("/livros", (req, res) => {
  const sql = "SELECT * FROM livros";

  conn.query(sql, function (err, dados) {
    if (err) {
      console.log(`ERRO: ${err}`);
      return;
    }
    const livros = dados;
    console.log(livros);

    res.render("livros", { livros });
  });
});

app.get("/", (req, res) => {
  res.sendFile(`${basepath}/index.html`);
});

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "vasco",
  database: "diego",
});

conn.connect(function (err) {
  if (err) {
    console.log(`Erro: ${err}`);
  }

  console.log("Conectou ao MySQL");

  app.listen(porta, () => {
    console.log(`Rodando na porta 3000`);
  });
});
