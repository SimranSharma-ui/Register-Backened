const express = require("express");
const connectDb = require("./config/db");
const router = require("./routes/UserRouter");
const midleware = require("./midleware/Usermidleware");
const cors = require("cors");
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(express.json());
app.use(cors());
connectDb();

app.use("/api/User", router);

app.listen(process.env.Port, () => {
  console.log("Server is runnig on 8000 port");
});
