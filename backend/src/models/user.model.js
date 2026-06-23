import mongoose, { model } from "mongoose";
import validator from 'validator'
const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName: {
        type: String,
    },
    email:{
        type:String,
        required: true,
        unique: true,
        index: true
    },
    password:{
        type:String,
        required: true,
        select: false

    },
    phoneNumber:{
        type:String,
    },
    age: {
        type: Number,
    },
    gender:{
        type:String,
        enum: ["Male", "Female", "Other"]
    },
    isPremium:{
type: Boolean,
default: false,
    },
    membershipType:{
        type:String
    },
    // membershipValidity  added in futures
     photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL: " + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is a default about of the user!",
    },
    lastSeen: {
        type:Date,
        default: Date.now()
    }
},{
    timestamps: true,
  })

const UserModel = model("User",UserSchema);
 export default UserModel;