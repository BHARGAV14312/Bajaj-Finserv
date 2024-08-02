
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: "Invalid input. 'data' should be an array.",
    });
  }

  const numbers = [];
  const alphabets = [];

  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (typeof item === "string" && /^[a-zA-Z]$/.test(item)) {
      alphabets.push(item);
    }
  });

  const highestAlphabet = alphabets.length
    ? [alphabets.sort((a, b) => b.toLowerCase().localeCompare(a.toLowerCase()))[0]]
    : [];

  const response = {
    is_success: true,
    user_id: "john_doe_17091999", 
    email: "john@xyz.com",
    roll_number: "ABCD123",
    numbers,
    alphabets,
    highest_alphabet: highestAlphabet,
  };

  res.status(200).json(response);
});

app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
