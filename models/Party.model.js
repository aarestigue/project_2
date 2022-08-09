const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const partySchema = new Schema(
  {
    creator: String,
    contributors : [/* {type : Schema.Types.ObjectId, ref: 'User'} */String],
    songs : [{type : Schema.Types.ObjectId, ref: 'Song'}],
    name : {
        type : String,
        required : [true, 'The name is required'],
        unique : [true, 'Username is already taken'],
        trim: true,
    },
    imageUrl : String,

/*  comments : [{type : Schema.Types.ObjectId, ref: 'Comments'}], */
    },
 {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Party = model("Party", partySchema);

module.exports = Party;
