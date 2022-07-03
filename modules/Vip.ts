const mongoose = require("mongoose");
const {Schema} = mongoose
const VIPSchema = new Schema({
    activeCode:String,
})

const Vip =mongoose.model('vip',VIPSchema)



module.exports = Vip;