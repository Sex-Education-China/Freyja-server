const mongoose = require("mongoose");
const {Schema} = mongoose
const VideoSchema = new Schema({
    title:String,
    id:Number,
    view:Number,
    like:Number,
    link:String,
    tag:Array,
})

const Video =mongoose.model('videos',VideoSchema)



module.exports = Video;