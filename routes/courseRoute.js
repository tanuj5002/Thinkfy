const express = require("express")
const router = express.Router()
const {courseCreate} = require("../controllers/playlistController")
router.post("/create", courseCreate);
module.exports = router