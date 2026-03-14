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
        enum: ["Male","Female","other"]
    }
})

const UserModel = model("User",UserSchema);
 export default UserModel;