const router = require('express').Router()
const bcrypt = require('bcryptjs');
const Usuarios = require('./Usuarios')
const passport = require('passport')

//GET ----------------------------------

router.get("/logar", (req,res, next) =>{
  if (req.query.fail)
    res.render('logar', {message: 'Usuário e/ou senha inválidos!'})
  else
    res.render('logar', {message: null})
})

router.get("/registrar", (req,res)=>{
  res.render('registrar')
})

router.get("/perfil", (req,res)=>{
  res.render('perfil')
})

//POST --------------------------------

router.post("/registrar", async (req, res)=>{
  const nome = req.body.nome
  const email = req.body.email
  const user = req.body.user
  const senha = bcrypt.hashSync(req.body.senha)

  const msg = await Usuarios.registrar({nome, email, user, senha})
  if (msg.tipo == "sucesso")
    res.redirect('/logar')
  else
    res.render('registrar', {msg})
})

router.post("/logar", passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/logar?fail=true',
}))


module.exports = router
