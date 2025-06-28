const express = require('express');
const connectDB = require("./config/dbConnection")
const cors = require('cors');
const app = express();
const dotenv = require("dotenv")
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
dotenv.config();
app.use(express.json()); //parse the data coming from the user into json
app.use("/api/course", require("./routes/courseRoute"))
app.use("/api/user", require("./routes/userRoute"))
app.use("/api/video", require("./routes/videoRoute"))
app.use("/api/quiz", require("./routes/quizRoute"))
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});