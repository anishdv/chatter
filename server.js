const express = require("express");
const app = express();
const PORT = 5000;
const http = require("http").createServer(app);


app.use(express.static(__dirname + "/public"));


app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/index.html");
});
http.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
