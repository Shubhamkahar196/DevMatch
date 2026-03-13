import mongoose, { model } from "mongoose";

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
        unique: true
    },
    password:{
        type:String,
        required: true,

    },
    phoneNumber:{
        type:String,
    },
    age: {
        type: Number,
    },
    gender:{
        type:String,
        enum: ["Male","Female"]
    }
})

const userModel = model("User",UserSchema);
 export default userModel;