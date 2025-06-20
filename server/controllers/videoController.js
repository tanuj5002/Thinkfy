const asyncHandler = require("express-async-handler");
const Video = require("../model/videoModel");
const axios = require("axios");

//@desc User courses
//@route GET /user/courses/:id
//@access public