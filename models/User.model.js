const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required'],
      unique: [true, 'Username is already taken'],
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Please use a valid email address'],
    },

    password: {
      type: String,
      required: true,

    },
    
    name : {
      type: String,
      trim: true,
      
      
    },

    last_name : {
      type: String,
      trim: true,
      
    },

    imageUrl : {
      type: String,
    },

     parties: [{type : Schema.Types.ObjectId, ref: 'Party'}],
     following : [{type : Schema.Types.ObjectId, ref: 'User'}],
     followers : [{type : Schema.Types.ObjectId, ref: 'User'}],
     posts : [{type : Schema.Types.ObjectId, ref: 'Post'}],
     comments : [{type : Schema.Types.ObjectId, ref: 'Comment'}],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
