const express = require("express")
const router = express.Router()
const {analyzeVideo} = require("../controllers/quizController");
router.post('/', analyzeVideo);
module.exports = router