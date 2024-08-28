const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("FROM THE SERVWER USER MAN:");
});

app.listen(5000, () => {
  console.log("Server Connected to 5000 :::");
});
