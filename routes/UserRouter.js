var express = require('express');
var router = express.Router();
const User = require('../modules/User')
/* GET users listing. */

function registerUser(obj) {
  const user = new User({
    username: obj.username,
    password: req.body.password
  })
  user.save()
}

function isUserExit(str) {
  //const data =  User.find({ username: 'admin'});
  const data = User.find();
  return data
}

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/exit', async function (req, res, next) {
  const data = await User.findOne({ username: req.body.username });
  if (data) {
    res.send({
      code: 1,
      msg: '用户名已存在'
    })
  } else {
    res.send({
      code: 0,
      msg: '用户名可用'
    })
  }
})
router.post('/register', async (req, res) => {
  const data = await User.findOne({ username: req.body.username });
  if (data) {
    res.send({
      code: 1,
      msg: '用户名已存在'
    })
  } else {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      isAdmin: false,
      isVip: false,
    })
    user.save()
    res.send({
      code: 0,
      msg: '注册成功'
    })
  }
})
router.post('/login', async (req, res) => {
  const data = await User.findOne({ username: req.body.username });
  if (data) {
    if (data.password === req.body.password) {
      req.session.username = req.body.username
      res.send({
        code: 0,
        msg: '登录成功'
      })
    } else {
      res.send({
        code: 1,
        msg: '密码错误'
      })
    }
  }
})
router.post('/logout', (req, res) => {
  req.session.username = null
  res.send({
    code: 0,
    msg: '注销成功'
  })
})
/*
router.post('modify', async (req, res) => {
  User.update({password:}, function (err, result) {
    if (err){

    }else{
        console.log("Result :", result)
    }
});
}
)

 */
router.post('/info',async (req,res) => {
  if (req.session.username) {
    const data = await User.findOne({ username: req.session.username });
    res.json(data)
  } else {
    res.send({
      code: 1,
      msg: '请先登录'
    })
  }
})

//这里使用base64编码，只要包含avc就可以
//一个玩具，不需要在安全方面考虑太多
router.post('/active', async (req, res) => {
  const data = await User.findOne({ username: req.session.username });
  if (req.session.username) {
    if (data.isVip) {
      res.send({
        code: 0,
        msg: '已是VIP'
      })
    } else {
      if (isValid(req.body.code)) {
        User.update({ username: req.session.username }, { isVip: true }, function (err, result) {
          if (err) {
            res.send({
              code: 1,
              msg: '激活失败'
            })
          } else {
            res.send({
              code: 0,
              msg: '激活成功'
            })
          }
        }
        )
      } else {
        res.send({
          code: 1,
          msg: '激活码错误'
        })
      }
    }
  } else {
    res.send({
      code: 1,
      msg: '请先登录'
    })
  }
})
function isValid(str) {
  if (atob(str).indexOf('avc') != -1) {
    return true
  } else {
    return false
  }
}
module.exports = router;