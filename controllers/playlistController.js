const asyncHandler = require("express-async-handler");
const Course = require("../model/playlistModel");
const axios = require("axios");

function extractPlaylistId(url) {
  const match = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

//@desc Course Creation
//@route POST /course/create
//@access public

const courseCreate = asyncHandler(async (req, res) => {
    const {userID, playlistUrl} = req.body;
    if(!userID || !playlistUrl){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const playlistID = extractPlaylistId(playlistUrl);
    console.log(playlistID);
    const api_request = `https://www.googleapis.com/youtube/v3/playlists/?key=${process.env.YT_API_KEY}&part=snippet,contentDetails&id=${playlistID}`;
    
        try{
            const response = await axios.get(api_request);
            const items = response.data.items;
            if (items && items.length > 0) {
                const course = await Course.create({
                    userID,
                    playlistId: playlistID, // YouTube playlist ID
                    title: items[0].snippet.title,
                    description: items[0].snippet.description,
                    thumbnail: items[0].snippet.thumbnails.standard.url,
                    totalVideos: items[0].contentDetails.itemCount,
                })
                if (course) {
                    res.status(200).json({ _id: course._id, playlistID: course.playlistId });
                } else {
                    res.status(400);
                    throw new Error("Could not create course");
                }
            }else{
                res.status(400);
                throw new Error("Playlist not found or is private")
            }
        }
        catch(err){
            console.log(err);
            res.status(500);
            throw new Error("API error")
        }

})

module.exports = {courseCreate}