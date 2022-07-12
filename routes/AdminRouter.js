const Video = require('../modules/Video')
const express = require('express');
const router = express.Router();
const random = require('mongoose-random');
const mongoose = require("mongoose");
const Schema = new mongoose.Schema({ /* ... */ });
Schema.plugin(random, { path: 'r' }); // by default `path` is `random`. It's used internally to store a random value on each doc.
router.post('/addVideo', async (req, res) => {
    const video = new Video({
        title:req.body.title,
        videoId:req.body.videoId,
        link:req.body.link,
    })
    video.save()
        .then( () => {
            res.send({
                code: 0,
                msg: '添加成功'
            })
        })
})
router.post('/getVideo',async (req,res)=>{
    const page = req.body.page
    const video = await Video.find().
    limit(req.body.limit).
    then(result=>{
        res.send(result)
    })
})
router.post('/getVideoByTag', (req,res)=>{
    const video =  Video.find(
        {title:{
            $regex:req.body.tag
        }}).
    then(result=>{
        res.send(result)
    })
})
router.post('/getVideoByTitle',async (req,res)=>{
    const video =  Video.find(
        {title:{
            $regex:req.body.title
        }}).
    then(result=>{
        res.send(result)
    })
})
router.post('/getVideoByPage',async (req,res)=>{
    const limit = 20
    const video =  Video.find().
    limit(20).
    skip(limit*(req.body.page-1)).
    then(result=>{
        res.send(result)
    })
})
router.post('/getTotal',async (req,res)=>{
    const total = await Video.countDocuments()
    res.send({
        total
    })
})
router.post('/randomVideo',async (req,res)=>{
    Video.findRandom({}, {}, {limit: 10}, function(err, results) {
        if (!err) {
            res.send(results)
        }
    });

})
module.exports = router;