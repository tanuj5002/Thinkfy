
const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
  _id: ObjectId,
  playlistId: ObjectId, // reference to Playlist
  videoId: String, // YouTube video ID
  title: String,
  description: String,
  thumbnail: String,
  duration: Number, // in seconds
  position: Number, // order in playlist
}, { timestamps: true })
module.exports = mongoose.model('video', videoSchema);
