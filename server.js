//importar o express 
const express = require('express') 
const bodyParser = require('body-parser') 
const moment = require('moment')
const passport = require('passport')
const session = require('express-session')
require('./config/auth')(passport);

//importando as rotas do aviso 
const routerAvisos = require('./components/avisos/AvisosController');
const routerUsuarios= require('./components/usuarios/UsuariosController');

//inicializar o express 
const app = express() 

//configurar a view engine e configurar a pasta publica 
app.set('view engine','ejs') 
app.use(express.static('public')) 

//disponibiliza o "moment" para o ejs
moment.locale("pt-bt")
app.locals.moment = moment

//configurar o body-parser 
app.use(bodyParser.urlencoded({extended:false})) 
app.use(bodyParser.json()) 

//consigurando o passport
app.use(session({
  secret: '123', //adicionar ao .env !!!
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 30 * 60 * 1000}
}))
app.use(passport.initialize());
app.use(passport.session());

//rotas 
app.use(routerAvisos, routerUsuarios)

//configuração da porta 
app.listen(3000) 
