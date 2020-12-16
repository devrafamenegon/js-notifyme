const bcrypt = require('bcryptjs');
const localstrategy = require('passport-local').Strategy;
// const db = require('./../knexfile');
// const Usuarios = require('../Components/avisos/Usuarios')

//const usuarios = Usuarios.selecionarUsuario(user);

const users = [{
  _id: 1,
  username: 'adm',
  password: '$2a$06$HT.EmXYUUhNo3UQMl9APmeC0SwoGsx7FtMoAWdzGicZJ4wR1J8alW',
  email: 'admin@example.com'
}]

module.exports = function (passport){

  // function selecionarUser(user) {
  //   return db
  //   .select("*")
  //   .into("usuarios")
  //   .where("user", user);
  // }

  // function selecionarUserById(id) {
  //   return db
  //   .select("*")
  //   .into("usuarios")
  //   .where("user_id", id);
  // }

  // passport.serializeUser((user, done) => {
  //   done(null, user.user_id)
  // })

  // passport.deserializeUser((id, done) => {
  //   try {
  //     const usuario = selecionarUserById(id);
  //     done(null, usuario);
  //   }
  //   catch (err) {
  //     console.log(err);
  //     return done(err, null);
  //   }
  // })

  // passport.use(new localstrategy({
  //   usernameField: 'user',
  //   passwordField: 'senha'}, (user, senha, done) => {
  //   try {
  //     const usuario = selecionarUser(user);
  //     if(!usuario) return done(null, false);
      
  //     const isValid = bcrypt.compareSync(senha, users.password);
  //     if(!isValid) return done(null, false);
  //     return done(null, usuario);
  //   }
  //   catch(err) {
  //     console.log(err);
  //     return done(err, null);
  //   }
  // }));



  function findUser(username){
    return users.find(item => item.username === username);
  }

  function findUserById(id){
    return users.find(item => item._id === id);
  }

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((id, done) => {
    try {
      const usuario = findUserById(id);
      done(null, usuario);
    }
    catch (err) {
      console.log(err);
      return done(err, null);
    }
  })

  passport.use(new localstrategy({
    usernameField: 'user',
    passwordField: 'senha'}, (user, senha, done) => {
    try {
      const usuario = findUser(user);
      if(!usuario) return done(null, false);
      
      const isValid = bcrypt.compareSync(senha, usuario.password);
      if(!isValid) return done(null, false);
      return done(null, usuario);
    }
    catch(err) {
      console.log(err);
      return done(err, null);
    }
  }));

}
