
const  express = require( 'express')
const mongoose = require('mongoose')
const dotenv = require( 'dotenv')
const cors = require('cors')
const authRoutes = require( './routes/route.js')
const connectMongoDB = require('./mongo/Mgconnect.js')

const taskRoutes = require("./routes/Task.js");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3003;
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use("/api/tasks", taskRoutes);

  connectMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server running on port 3001');
  });
});
