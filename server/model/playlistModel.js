const mongoose = require("mongoose");

const playlistSchema = mongoose.Schema({
  userId:mongoose.Schema.Types.ObjectId, // reference to User
  playlistId: String, // YouTube playlist ID
  title: String,
  description: String,
  thumbnail: String,
  totalVideos: Number,
}, { timestamps: true });
module.exports = mongoose.model("playlist", playlistSchema);
