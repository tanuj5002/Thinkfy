const express = require("express")
const router = express.Router()
const {courseCreate, courseAccess} = require("../controllers/playlistController")
router.post("/create", courseCreate).get("/:id", courseAccess);
module.exports = router