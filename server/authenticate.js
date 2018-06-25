var {User} = require('./model/user.js')

var authenticate = (req,res,next) =>{

  User.findOne({usuario:req.body.usuario}).then((user) => {
    if(!user) {
return Promise.reject();
    }
    req.user = user;
    next();
  }).catch((e) =>{
    res.status(401).send();
  });
};

module.exports ={authenticate}
