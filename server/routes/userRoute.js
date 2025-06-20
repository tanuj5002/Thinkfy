const express = require("express")
const router = express.Router()
const {register, allCourses} = require("../controllers/userController")
router.post("/register", register).get("/courses/:id", allCourses);
module.exports = router