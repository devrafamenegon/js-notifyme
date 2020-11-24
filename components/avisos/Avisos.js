//conexão com o banco de dados
const db = require('../../knexfile');

/**
 * @param {object} aviso 
 * @returns {object} mesnsagem de sucesso ou erro
 */

function salvar(aviso){
  //insert
  //db.insert('<nome da tabela'>).into(<obj com dados>)
  return db.insert(aviso).into('avisos')
  .then(_ => { 
    return { tipo: "sucesso", corpo: "Dados inseridos com sucesso" }
    })
  .catch(erro => 
  {
    return { 
      tipo: "erro", corpo: "Erro" + erro
    } 
  })

}//fim do salvar

/** Seleciona todos os avisos cadastrados
 * @returns {object} objeto com todos os avisos cadastrados ou uma mensagem de erro
 */
function selecionarTodos(){
  return db.select('*').from('avisos').then(avisos =>{ return avisos }).catch(erro =>{ return {tipo: "erro", corpo: "Erro: " + erro} })
}//fim do selecionarTodos

module.exports = {salvar, selecionarTodos}
