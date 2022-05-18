const express = require("express");
const axios = require("axios");
const { google } = require("googleapis");
require("dotenv").config();
const app = express();
const port = 3000;

const baseURL = "https://www.googleapis.com/youtube/v3";


const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_APIKEY,
});

app.get("/", (req, res) => {
  res.send( "Node js Server " );
  

});

// with googleapis library
app.get("/search", async (req, res, next) => {
  try {
    const searchQuery = req.query.search_query;
    const response = await youtube.search.list({
      part: "snippet",
      q: searchQuery,
      type: "video",
    });
    const titles = response.data.items.map((i) => i.snippet.title);
    res.send(titles);
  } catch (error) {
    next(error);
  }
});

// without library
// app.get("/search", async (req, res, next) => {
//   try {
//     const searchQuery = req.query.search_query;
//     const url = `${baseURL}/search?key=${API_KEY}&type=video&part=snippet&q=${searchQuery}`;
//     const response = await axios.get(url);
//     const titles = response.data.items.map((i) => i.snippet.title);
//     res.send(titles);
//   } catch (error) {
//     next(error);
//   }
// });

app.listen(port, () => {
  console.log("app is started");
});
