const Router = require('express').Router();
var {User} = require('./model/user.js')
var {Evento} = require('./model/evento.js')
const _ = require('lodash');
var {authenticate} = require("./authenticate");
const {ObjectID} = require ('mongodb')


//eventos registrados al usuario
Router.get("/all",function (req, res) {
    var usuario = req.query.usuario
  User.findOne({usuario:usuario}).then((user) => {
    if(!user) {
  return Promise.reject();
    }
    req.user = user;
  Evento.find({
    _creator: req.user._id
  }).then((evento) => {
    if (!evento) {
      console.log("vacio");
      return res.status(404).send({evento});
    }
    console.log("bien");
    res.send({evento});
}).catch((e) => {
res.status(400).send();
console.log("bien2");
});
}).catch((e) =>{
  res.status(401).send();
});
})





// Obtener un usuario por su id
Router.post("/new", function (req, res) {
  var body = _.pick(req.body, ["usuario"])
User.findOne({usuario:body.usuario}).then((user) => {
  if(!user) {
return Promise.reject();
  }
  req.user = user;
  let evento = new Evento({
    _creator:req.user._id,
    title: req.body.title,
    start: req.body.start,
    end: req.body.end
    })
    evento.save().then(()=>{
      console.log("funciono");
      res.send("Registro guardado")
    }).catch((e) =>{
      console.log("no");
      res.status(400).send();
      })
    }).catch((e) =>{
      res.status(401).send("no se encontro");
    });
    })

//elimina evento
  Router.post("/delete",function (req, res) {
    //new object id porque se recibe el object id del elemento
    // si se copia el _id solo se debe colocar lo copiado
    let id = new ObjectID(req.body._id)
    console.log(id);
    if(!ObjectID.isValid(id)){
  return res.status(404).send("no es valido el id")
}
Evento.findOneAndRemove({
    _id: id
  }).then ((evento) =>{
    if(!evento){
      return res.status(404).send("mal");
    }
    res.send("Se ha eliminado el elemento")

  }).catch((e) =>{
    res.status(400).send("no hay evento");
  });
});

//actualiza evento
  Router.post("/update",function (req, res) {
     var id = new ObjectID(req.body._id);
     var body = _.pick(req.body, ["title", "start", "end"])

     if(!ObjectID.isValid(id)){
    return res.status(404).send("no es valido el id")
  }
  Evento.findOneAndUpdate({
    _id: id
  }, {$set: body}, {new: true}).then((evento)=>{
    if(!evento){
      return res.status(404).send();
    }
    res.send("Evento modificado");
  }).catch((e) =>{
    res.status(400).send("No se encontro el evento");
  })
})

//login
  Router.post("/login",function (req, res) {
  var body = _.pick(req.body, ["usuario", "pass"])
  User.findByCredentials(body.usuario, body.pass).then(() =>{
    console.log(body);
    mirar = body.usuario;
    res.send(body);
  }).catch((e) =>{
    console.log("mal");
    res.send("mal");
    })
  })

// Agregar a un usuario
Router.post("/newUser",function (req, res) {
  console.log("registro");
  var body = _.pick(req.body, ["usuario", "pass", "nombres", "apellidos"])
  let user = new User(body)
  user.save().then(()=>{
    res.send("Registro guardado")
  }).catch((e) =>{
    res.send("Usuario ya existe");
    })
})







module.exports = Router
