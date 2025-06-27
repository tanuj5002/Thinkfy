const express = require('express');
const connectDB = require("./config/dbConnection")
const app = express();
connectDB();
app.use(express.json()); 
app.use("/api/course", require("./routes/courseRoute"))
app.use("/api/user", require("./routes/userRoute"))
app.use("/api/video", require("./routes/videoRoute"))
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
