const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB =  require("./config/mgconnect")

 const PORT = process.env.PORT || 3001;

 const app = express();
 dotenv.config();
connectDB();
 
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/user"));

app.get("/", (req, res) => res.send("API Running"));


 app.listen(PORT, () => console.log( `Server is started at PORT:${PORT}`));