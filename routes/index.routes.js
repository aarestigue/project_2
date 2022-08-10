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
  let party = await Party.findOne({name: name})
  
  
 /*  .then((party)=> {
      party.songs.forEach((song) => {
      const displaySong = youtube.search.list({
      part: "snippet",
      q: song,
      type : "video",
      });
    
    const playlistSong = displaySong.data.items[0].snippet.title; 
    console.log(displaySong);
    })
  }) */
  

  const response = await youtube.search.list({
    part: "snippet",
    q: `karaoke ${search}`,
    type : "video",
    maxResults : 10,
    videoEmbeddable : true,
    });

    const songQuery = response.data.items.map((item)=> item);

   const data = {
      songQuery,
      party,
      
    }



  /* await response */
  res.render('parties/party-detail', { data}) 
 
  
}
  
  catch (err) {next(err)}; 
  
  
})
//USER

router.get ("/:username/profile", (req, res, next) => {
  const username= req.params.username;
  
  res.render('users/profile', {username})
})

//DELETE USER

router.get ("/:username/delete", (req, res, next)=>{
  console.log('delete')
  const {username} = req.params
  User.findOneAndDelete({username : username})
  .then((response)=> res.redirect("/"))
  .catch((err) => next(err))
})

//EDIT USER

router.post ("/:username/edit", (req, res, next) => {
  const {username} = req.params
  res.render('users/profile-edit', username)
} )


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


router.post ("/add-song/:id/:partyId/:songTitle", async (req, res, next) => {
const {id, partyId, songTitle} = req.params;

const addSong = {
  id: id,
  title:songTitle,
}


try {
  const party = await Party.findByIdAndUpdate(partyId, {$push: {songs: addSong}})


  res.redirect(`/${party.creator}/party/${party.name}`)

  }
     
  
catch (err) {next(err)}; 



  
})

// KARAOKE

router.get ("/:party/karaoke", async (req, res, next) => {
  const {party} = req.params
  

  try{
  const partyPlaylist = await Party.findOne({name: party})
  

  /* await partyPlaylist.songs.forEach((song)=> {
   
        const response = youtube.search.list({
          part: "snippet",
          q: song,
          type : "video",
          maxResults : 10,
          });

          console.log(response)
      
    
  }); */
 
 

  const data = {
    partyPlaylist,
    party
  }

  

  res.render('parties/party-karaoke', data)

}
catch (err) {next(err)}; 
})

router.get ("/:username/:name/:songId", (req, res, next) => {
  const {username, name, songId} = req.params
  
  Party.findOne({name: name})
  .then((party) =>res.render('parties/party-karaoke', {username, name, songId, partyPlaylist : party}))
  
  .catch((err) => next(err))
})
module.exports = router;
