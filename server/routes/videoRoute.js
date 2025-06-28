const express = require("express")
const router = express.Router()
const {VideosOfCourse, videoDetails, updateVideo} = require("../controllers/videoController");
router.get('/course/:id', VideosOfCourse).get('/:id', videoDetails).put('/:id', updateVideo)
module.exports = router