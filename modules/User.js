const mongoose = require("mongoose");
const {Schema} = mongoose
const UserSchema = new Schema({
    username:String,
    password:String,
    isAdmin:Boolean,
    isVip:Boolean,
    registerTime:Date,
    lastLoginTime:Date,
    email:String,
    id:String,
})

const User =mongoose.model('users',UserSchema)



module.exports = User;