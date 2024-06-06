const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/users", require("./routers/users"));
app.use("/descriptions", require("./routers/descriptions"));

app.listen(3000);
