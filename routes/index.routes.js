const router = require("express").Router();

const fileUploader = require('../config/cloudinary.config');

const axios = require('axios');
const {google} = require('googleapis');

const User = require("../models/User.model");
const Party = require("../models/Party.model");


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

router.get ("/:creator/party/:name", async (req, res, next) => {
const {search} = req.query;
const {creator, name} = req.params;
try {
  /* const searchQuery = req.query.search_query */
  /* const url = `${baseUrl}/search?key=${apiKey}&type=video&part=snippet&q=${searchQuery}`; 

  const response = await axios.get(url); */
  const response = await youtube.search.list({
    part: "snippet",
    q: search,
    type : "video",

    });

    const songQuery = await response.data.items.map((item)=> item);
   
  /* await response */
  res.render('parties/party-detail', {songQuery, creator, name}) 
  console.log(response.data.items)
  
}
  
  catch (err) {next(err)}; 
  
  
})
//USER

router.get ("/:username/profile", (req, res, next) => {
  const username= req.params.username;
  console.log(username)
  res.render('users/profile', {username})
})

//CREATE PARTY

router.get ("/:username/create-party", (req, res, next) => {
  const username = req.params.username;

  User.find()
  .then((allUsers) => {res.render('parties/create-party', {username, allUsers})})
  .catch((err) => next(err))


  
})

router.post ("/:username/create-party", fileUploader.single('imageUrl'), (req, res, next) => {
 
  const {username} = req.params; 
  /* res.render('parties/create-party', {username}) */

  const {name, creator, contributors} = req.body;
  const imageUrl = req.file.path;
  

  Party.create({name, creator, contributors, imageUrl})
  .then((user) => {res.redirect(`/${creator}/party/${name}`)})
  .catch((err) => next(err))


  
})

//UPDATE PARTY

router.post ("/add-song/:id", async (req, res, next) => {


const {id} = req.query;
const {creator, name} = req.params;
try {
  /* const searchQuery = req.query.search_query */
  /* const url = `${baseUrl}/search?key=${apiKey}&type=video&part=snippet&q=${searchQuery}`; 

  const response = await axios.get(url); */
  const response = await youtube.search.list({
    part: "snippet",
    type : "video",

    });

    const song = await response.data.items.map((item)=> item.id.videoId);
   
  /* await response */
  res.render('parties/party-detail', {id, song, creator, name}) 
  console.log(song)
  
}
  
  catch (err) {next(err)}; 
  
  


})

// KARAOKE

router.get ("/party/karaoke", async (req, res, next) => {
  res.render('karaoke')
})

module.exports = router;
