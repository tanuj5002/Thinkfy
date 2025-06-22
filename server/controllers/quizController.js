const asyncHandler = require("express-async-handler");
const axios = require("axios");

const getVideoTranscript = async (videoId) => {
  try {
    const response = await axios.post("http://localhost:5001/transcript", {
      videoId: videoId
    });

    return response.data.transcript; // plain text
  } catch (err) {
    console.error("Transcript API error:", err.response?.data || err.message);
    throw new Error("Transcript fetch failed");
  }
};

//@desc video summary and quiz
//@route GET /quiz
//@access public

const analyzeVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.body;

  if (!videoId) {
    res.status(400);
    throw new Error("YouTube video URL is required");
  }

  try {
    const transcript = await getVideoTranscript(videoId);
    // console.log(transcript);
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat-v3-0324:free", // or any other model you prefer
        messages: [
          {
            role: "user",
            content: `Here is a YouTube video transcript: ${transcript}

1. Summarize the content of the video in simple language (150-200 words).
2. Generate 5 multiple choice questions based on the video, each with 4 options (A-D), and mark the correct answer with a '*' at the end of the option.`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        }
      }
    );

    res.status(200).json(response.data);
  } catch (err) {
    console.error("OpenRouter API error:", err.response?.data || err.message);
    res.status(500);
    throw new Error("Failed to analyze video");
  }
});

module.exports = { analyzeVideo };


