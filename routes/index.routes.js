const router = require("express").Router();

const fileUploader = require('../config/cloudinary.config');

const axios = require('axios');


/* MODELS */

const User = require("../models/User.model");
const Party = require("../models/Party.model");

/* GOOGLE API */

const {google} = require('googleapis');
const apiKey = process.env.API_KEY;
const baseUrl = "https://www.googleapis.com/youtube/v3";
const youtube = google.youtube({
  version: 'v3',
  auth : apiKey,
});

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const { response } = require("../app");




/* GET home page */
router.get("/", (req, res, next) => {
  const user = req.session.user;

  res.render("index", {user});
});

/* router.get("/:username", (req, res, next) => {
  const {username} = req.params;
  console.log(username)
  res.render("index", username);
}); */



// SEARCH - PARTY DETAIL

router.get ("/:creator/party/:name", isLoggedIn, async (req, res, next) => {
const {search} = req.query;
const {creator, name} = req.params;
const user = req.session.user


try {
  /* const searchQuery = req.query.search_query */
  /* const url = `${baseUrl}/search?key=${apiKey}&type=video&part=snippet&q=${searchQuery}`; 

  const response = await axios.get(url); */

 
  const party =await Party.findOne({user, name: name})
  .populate({
    path : 'contributors',
    model : 'User',
  }) 


  
  if (!search) {
    const data = {
      party,
      search,
      }
    res.render('parties/party-detail', {data, user}) 
    console.log(data)
  }
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
      search,
      
      
    }



  /* await response */
  res.render('parties/party-detail', { data, user}) 
 
  
}
  
  catch (err) {next(err)}; 
  
  
})
//USER

router.get ("/:username/profile", (req, res, next) => {
  const username= req.params.username;
  const user = req.session.user
  const {userId} = user._id
  
 User.findOne(userId)
 .populate({
  path: 'parties',
  model: 'Party',
  })
  .then((response)=> res.render('users/profile', {username, user, response}))

  
}) 

//DELETE USER

router.get ("/:username/delete", (req, res, next)=>{
 
  const {username} = req.params

  /* User.findOne({ username })
    .then((user) => {
  req.app.locals.loggedOutUser = user; 
    })

  .then((response) => {req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .render("auth/logout", { errorMessage: err.message });
    }

  })
})
.then((response) => { */
  User.findOneAndDelete({username : username})
  .then(()=> {
    req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .render("auth/logout", { errorMessage: err.message });
    }
  })
})
.then(()=> res.redirect('/'))
  .catch((err) => next(err))
})

//EDIT USER

router.get ("/:username/edit", (req, res, next) => {
  
  const {username} = req.params;
  
  User.findOne({username:username})
  .then((user)=> {
    
    res.render('users/profile-edit', {user})
  })
  .catch((err) => next(err))
} )

router.post ("/:username/edit", fileUploader.single('imageUrl'), (req, res, next) => {
  
  const {username, email, name, last_name, previousUrl} = req.body;

  let imageUrl;

  if (req.file) {
    imageUrl = req.file.path;
  } else {
    imageUrl = previousUrl;
  }

  User.findOneAndUpdate({username, email, name, last_name, imageUrl })
  .then((user)=> res.redirect(`/${username}/profile`))
  

})

//CREATE PARTY

router.get ("/:username/create-party", (req, res, next) => {
  const username = req.params.username;
  const user = req.session.user

  

  User.find()
  .then((allUsers) => {res.render('parties/create-party', {username, allUsers, user})})
  .catch((err) => next(err))


  
})

router.post ("/:username/create-party", fileUploader.single('imageUrl'), (req, res, next) => {
 
  const username = req.params.username; 
  console.log(username)
  /* res.render('parties/create-party', {username}) */

  const {name, creator, contributors} = req.body;
  const imageUrl = req.file.path;
 

  Party.create({name, creator, contributors, imageUrl})
  .then((party)=> User.findOneAndUpdate({username:username}, { $push: { parties: party._id } }))
  .then((response)=> {
    res.redirect(`/${response.username}/party/${name}`)
  })
  .catch((err) => next(err))
})

//UPDATE PARTY - ADD SONGS


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

//UPDATE PARTY - CHANGE NAME & ADD CONTRIBUTORS

router.get ("/:name/edit/party", (req, res, next) => {
  const {name} = req.params;
  const user = req.session.user;

  User.find()
  .then((allUsers) => {

  Party.findOne({name:name})
  .populate({
    path: 'contributors',
    model: 'User',
    })
  .then((party)=> {
    
    allUsers.forEach((user) => {
      party.contributors.forEach((party) => {
        if (user._id.equals(party._id)) {
          user.isContributor = true;
        }
      })
    })
    res.render('parties/party-edit', {name, user, party, allUsers})
  })
})
  .catch((err) => next(err))
})

router.post ("/:partyName/edit-party", fileUploader.single('imageUrl'), async (req, res, next) => {
  try {
    const {name, contributors, previousUrl} = req.body;
  const {partyName} = req.params
  const user = req.session.user;
  const username = user.username;
  let imageUrl;

  if (req.file) {
    imageUrl = req.file.path;
  } else {
    imageUrl = previousUrl;
  }
  const updatedParty = await Party.findOneAndUpdate({name: partyName}, {name, contributors, imageUrl }, {new: true})

  const party = await updatedParty.populate("contributors")
/* console.log("here => ", party.contributors.length) */
  const forLoop = async () => {
    for (let i = 0; i < party.contributors.length; i++) {
        /* for (let j=0; j<party.contributors[i].parties.length; j++){
          if (!party.contributors[i].parties._id === party._id){ */
            await User.findOneAndUpdate({username: party.contributors[i].username}, {
              $push: {
                parties: party._id
              }
          })
        }
          /* else {console.log('party already exists')}
    
        
          } */
       

      
  }
  await forLoop()
  res.redirect(`/${username}/party/${name}`)
  /* .then((party)=> User.findOneAndUpdate({username:username}, { $push: { parties: party._id } })) */
  /* .then((party)=> res.redirect(`/${username}/party/${name}`)) */
  } catch (error) {
    next(error)
  }
  
  

})

//DELETE PARTY

router.get ("/:name/delete/party", (req, res, next)=>{
  const user = req.session.user;
  const username = user.username;
  const {name} = req.params
  console.log(name)

  Party.findOneAndDelete({name : name})
  .then(()=> res.redirect(`/${username}/profile`))
  .catch((err) => next(err))
})

// KARAOKE

router.get ("/:party/karaoke", async (req, res, next) => {
  const {party} = req.params
  const user = req.session.user;

  try{
  const partyPlaylist = await Party.findOne({ name: party})
  

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

  

  res.render('parties/party-karaoke', {user, data})

}
catch (err) {next(err)}; 
})

router.get ("/:username/:name/:songId", (req, res, next) => {
  const {username, name, songId} = req.params
  const user = req.session.user
  

 Party.findOne({name: name})
  .then((partyPlaylist)=> {
    
  const data ={
    partyPlaylist,
    
  }
  res.render('parties/party-karaoke', {user, username, name, songId, data})
  console.log(data)
  
  })
  
  
  .catch((err) => next(err))
})
module.exports = router;
