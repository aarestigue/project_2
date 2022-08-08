const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const songSchema = new Schema(
  {
   artist: String,
   name : {
    type : String,
    required : [true, 'The name is required'],
    unique : [true, 'Username is already taken'],
    trim: true,
},

imageUrl : String,

duration: Number ,

genre: String, 

   },

{
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Song = model("Song", songSchema);

module.exports = Song;
