const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

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
module.exports = {register};

