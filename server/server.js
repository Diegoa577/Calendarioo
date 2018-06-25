//mongod.exe --dbpath D:\Nextu\DiseñoWeb\InteractuandoBasesDatos\Curso7\datos
const http = require('http');
const path = require('path');
const Routing = require('./rutas.js');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT=3000;

var app = express()

const Server = http.createServer(app)

mongoose.connect('mongodb://localhost:27017/calendario');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("client"));

app.use("/events", Routing);

Server.listen(PORT, function () {
  console.log("Server is listening on port: "+PORT);
})
