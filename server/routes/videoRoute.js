const express = require("express")
const router = express.Router()
const {VideosOfCourse, videoDetails} = require("../controllers/videoController");
router.get('/course/:id', VideosOfCourse).get('/:id', videoDetails);
module.exports = router