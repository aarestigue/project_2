const router = require("express").Router();
const axios = require('axios');
const {google} = require('googleapis');
const apiKey = process.env.API_KEY;
const baseUrl = "https://www.googleapis.com/youtube/v3";
const youtube = google.youtube({
  version: 'v3',
  auth : apiKey,
});




/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// SEARCH

router.get ("/search", async (req, res, next) => {
try {
  const searchQuery = req.query.search_query;
  /* const url = `${baseUrl}/search?key=${apiKey}&type=video&part=snippet&q=${searchQuery}`; 

  const response = await axios.get(url); */
  const response = await youtube.search.list({
    part: "snippet",
    q: searchQuery,
    type : "video",
  });

  const titles = response.data.items.map((item)=> item.snippet.title);
 
  /* await response */
  res.send(titles); 
  console.log(titles)
}
  
  catch (err) {next(err)}; 
  
  
})

// KARAOKE

router.get ("/party/karaoke", async (req, res, next) => {
  res.render('karaoke')
})

module.exports = router;
