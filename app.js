const express = require('express')
const { model } = require('mongoose')
const app = express()
const port = 6000
const usersRouter = require('./routes/UserRouter')
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const session = require('express-session')
const User = require("./modules/User");
const AdminRouter = require("./routes/AdminRouter");
const Tools = require("./handle/Tools");
app.use(session({
  secret:'session-secret',
  saveUninitialized:true, //保存未初始化的session
  resave:true,
  cookie:{
    expires: new Date(Date.now() + 1000*60*60*24*7) //过期时间为7天
  }
}))
mongoose.connect(
  'mongodb://localhost:27017/bornhub'
)
  .then(()=>console.log('connected'))
  .catch(e=>console.log(e)
)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/users', usersRouter)
app.use('/admin',AdminRouter)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
module.exports = app;