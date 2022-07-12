const mongoose = require("mongoose");
const {Schema} = mongoose
const random = require('mongoose-simple-random');
const VideoSchema = new Schema({
    title:String,
    id:Number,
    view:Number,
    like:Number,
    link:String,
    tag:Array,
})
VideoSchema.plugin(random)
const Video =mongoose.model('videos',VideoSchema)
module.exports = Video;