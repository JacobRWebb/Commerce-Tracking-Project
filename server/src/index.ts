require("dotenv-safe/config");
import express from "express";
const app = express();
const PORT: number = parseInt(process.env.PORT);

app.get("*", (req, res) => {
  req;
  res.send("API");
});

app.listen(PORT, () => {
  console.log(`Server is running.\nhttp://localhost:${PORT}/`);
});
