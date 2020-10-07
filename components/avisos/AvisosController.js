const router = require('express').Router()

router.get("/",(req,res)=>{
  res.send("Pagina inicial")
})

router.get("/avisos",(req, res)=>{
  res.send("Pagina de avisos cadastrados")
})

router.get("/avisos/novo",(req, res)=>{
  res.render('formulario_avisos')
})

module.exports = router
