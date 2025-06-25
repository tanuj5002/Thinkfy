const asyncHandler = require("express-async-handler");
const Video = require("../model/videoModel");
const Course = require("../model/playlistModel")
const axios = require("axios");

//@desc Get videos of a course
//@route GET /video/course/:id
//@access public

const VideosOfCourse = asyncHandler(async (req,res) => {
    const course = await Course.findById(req.params.id);
    const course_videos = course.videos;
    const videos = await Video.find({_id:course_videos});
    if(!videos){
        res.status(500);
        throw new Error("Could not get videos");
    }
    else{
        res.status(200).json(videos);
    }
})

//@desc Get videos of a course
//@route GET /video/:id
//@access public

const videoDetails = asyncHandler(async (req,res) => {
    const video = await Video.findById(req.params.id);
    if(!video){
        res.status(500);
        throw new Error("Could not get video");
    }
    else{
        res.status(200).json(video);
    }
})


//@desc Update data in a video
//@route PUT /video/:id
//@access public

const updateVideo = asyncHandler(async (req,res) => {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, {returnOriginal:false});
    if(!video){
        res.status(400);
        throw new Error("Could not update the data");
    }else{
        res.status(200).json(video);
    }
})

module.exports = {VideosOfCourse, videoDetails, updateVideo};