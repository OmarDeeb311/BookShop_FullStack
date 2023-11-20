const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const port = 8800;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "00000000",
  database: "first-fullstackapp",
});

app.get("/", (req, res) => {
  res.json("Hello This is the backend");
});

app.get("/books", (req, res) => {
  const query = "SELECT * FROM books";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    console.log("All Books Returned");
    res.json(data);
  });
});

app.post("/books", (req, res) => {
  const { name, title, cover, price } = req.body;
  const query =
    "INSERT INTO books (`name`, `title`, `cover` , `price`) VALUES (? , ? , ? , ?)";
  db.query(query, [name, title, cover, price], (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
});

app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM books WHERE id = ?";
  db.query(query, [id], (err, data) => {
    if (err) return res.json(err);
    console.log("Book Has Been Deleted");
  });
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM books WHERE id = ?";
  db.query(query, [id], (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const id = req.params.id;
  const { name, title, cover, price } = req.body;
  const query =
    "UPDATE books SET `name` = ?,`title` = ?,`cover` = ?,`price` = ?  WHERE id = ?";
  db.query(query, [name, title, cover, price, id], (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
});

app.delete("/books", (req, res) => {
  const query = "DELETE FROM books ";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    console.log("Book Has Been Deleted");
  });
});

app.listen(port, () => {
  console.log(`App Running At : localhost:${port}`);
});
