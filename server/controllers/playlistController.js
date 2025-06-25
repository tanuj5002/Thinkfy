const asyncHandler = require("express-async-handler");
const Course = require("../model/playlistModel");
const axios = require("axios");
const Video = require("../model/videoModel");
const User = require("../model/userModel");

function extractPlaylistId(url) {
  const match = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

function parseISODuration(duration) {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;

  const [, hours = 0, minutes = 0, seconds = 0] = duration
    .match(regex)
    .map(v => parseInt(v) || 0);

  return hours * 3600 + minutes * 60 + seconds;
}


async function fetchAllPlaylistVideos(playlistId) {
  const API_KEY = process.env.YT_API_KEY;
  const baseUrl = "https://www.googleapis.com/youtube/v3/playlistItems";
  let nextPageToken = null;
  let videos = [];

  do {
    const res = await axios.get(baseUrl, {
      params: {
        part: "snippet,contentDetails",
        maxResults: 50,
        playlistId: playlistId,
        pageToken: nextPageToken,
        key: API_KEY,
      },
    });

    const items = res.data.items.map((item) => ({
      videoId: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails?.standard?.url,
      description: item.snippet.description,
      publishedAt: item.contentDetails.videoPublishedAt,
      position: item.snippet.position,
    }));

    videos.push(...items);

    nextPageToken = res.data.nextPageToken; // get the next token
  } while (nextPageToken);

  return videos;
}

//@desc Course Creation
//@route POST /course/create
//@access public

const courseCreate = asyncHandler(async (req, res) => {
  const { userID, playlistUrl } = req.body;
  if (!userID || !playlistUrl) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const playlistID = extractPlaylistId(playlistUrl);
  console.log(playlistID);
  const api_request = `https://www.googleapis.com/youtube/v3/playlists/?key=${process.env.YT_API_KEY}&part=snippet,contentDetails&id=${playlistID}`;

  try {
    const response = await axios.get(api_request);
    const items = response.data.items;
    if (items && items.length > 0) {
      const course = await Course.create({
        userId: userID,
        playlistId: playlistID, // YouTube playlist ID
        title: items[0].snippet.title,
        description: items[0].snippet.description,
        thumbnail: items[0].snippet.thumbnails.standard.url,
        totalVideos: items[0].contentDetails.itemCount,
      });

        await User.findByIdAndUpdate(userID, {
          $push: { course: course._id }
      });
      // Storing videos to database
      const videos = await fetchAllPlaylistVideos(playlistID);
      let chk = true;
      if (course) {
        for (const video of videos) {
          const vidRes = await axios.get(
            `https://www.googleapis.com/youtube/v3/videos`,
            {
              params: {
                id: video.videoId,
                part: "contentDetails",
                key: process.env.YT_API_KEY,
              },
            }
          );

          const duration =
            vidRes.data.items[0]?.contentDetails?.duration || null;
          const durationInSec = parseISODuration(duration);
          const vidSave = await Video.create({
            playlistId: course._id,
            videoId: video.videoId,
            title: video.title,
            lastWatchedTill: 0,
            description: video.description,
            thumbnail: video.thumbnail,
            duration: durationInSec,
            position: video.position,
            isCompeleted: false,
          });
          if(vidSave){
            await Course.findByIdAndUpdate(course._id, {
              $push: { videos: vidSave._id }
            });
          }
          if (!vidSave) chk = false;
        }
        if (chk) {
          res
            .status(200)
            .json({ _id: course._id, playlistID: course.playlistId });
        } else {
          res.status(400);
          throw new Error("Error accessing videos");
        }
      } else {
        res.status(400);
        throw new Error("Could not create course");
      }
    } else {
      res.status(400);
      throw new Error("Playlist not found or is private");
    }
  } catch (err) {
    console.log(err);
    res.status(500);
    throw new Error("API error");
  }
});

//@desc Course Access
//@route GET /course/:id
//@access public

const courseAccess = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const courseFind = await Course.findById(req.params.id);
  console.log(courseFind);
  if (!courseFind) {
    res.status(400);
    throw new Error("Could not find course");
  } else {
    res.status(200).json(courseFind);
  }
});

module.exports = { courseCreate, courseAccess };
