const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  course: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "playlist" 
    }
  ]
}, { timestamps: true })
module.exports = mongoose.model('user', userSchema);

