const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const Course = require("../model/playlistModel")

//@desc User register
//@route POST /user/register
//@access public
const register = asyncHandler(async (req,res) =>{
    const {name, email} = req.body;
    if(!name || !email){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.create({
        name,
        email
    })
    if(user){
        res.status(200).json({_id:user._id, email:user.email});
    }
    else{
        res.status(500);
        throw new Error("Could not create user")
    }
})

//@desc User courses
//@route GET /user/courses/:id
//@access public
const allCourses = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    user_courses = user.course;
    const courses = await Course.find({ _id: { $in: user_courses } });
    // const courses = await Course.find({userId:req.params.id});
    if(!courses){
        res.status(400);
        throw new Error("Courses not found");
    }
    else{
        res.status(200).json(courses);
    }
})



module.exports = {register, allCourses};