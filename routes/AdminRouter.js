const Video = require('../modules/Video')
const express = require('express');
const router = express.Router();

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
    const video = await Video.find().then(result=>{
        console.log(result)
        res.send(result)
    })
})
module.exports = router;