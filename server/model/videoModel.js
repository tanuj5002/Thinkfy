
const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
  playlistId: mongoose.Schema.Types.ObjectId, // reference to Playlist
  videoId: String, // YouTube video ID
  title: String,
  lastWatchedTill:Number,
  description: String,
  thumbnail: String,
  duration: Number, // in seconds
  position: Number, // order in playlist
  isCompeleted:Boolean
}, { timestamps: true })
module.exports = mongoose.model('video', videoSchema);
