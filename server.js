//importar o express 
const express = require('express') 
const bodyParser = require('body-parser') 

//inicializar o express 
const app = express() 

//configurar a view engine e configurar a pasta publica 
app.set('view engine','ejs') 
app.use(express.static('public')) 

//configurar o body-parser 
app.use(bodyParser.urlencoded({extended:false})) 
app.use(bodyParser.json()) 

//rotas 
app.get("/",(req,res)=>{ 
    res.send("Vai ETIM!!!!")
})

//configuração da porta 
app.listen(3000) 