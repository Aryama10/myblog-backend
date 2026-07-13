const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Food Review Backend Running");
});

app.get("/restaurants", (req, res) => {
  db.query("SELECT * FROM restaurants", (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
});
app.post("/restaurants", (req, res) => {
  const { name, location, image, rating, review } = req.body;

  const sql =
    "INSERT INTO restaurants(name,location,image,rating,review) VALUES (?,?,?,?,?)";

  db.query(
    sql,
    [name, location, image, rating, review],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Restaurant Added Successfully"
      });
    }
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
