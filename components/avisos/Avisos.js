//conexão com o banco de dados
const db = require('../../knexfile');

/**
 * Inserir um aviso no banco de dados
 * @param {object} aviso O aviso deve estar no formato:
 * {titulo: <string>, data: <string>, mensagem: <string>}
 * @returns {object} mensagem de sucesso ou erro
 */
function salvar(aviso){
  //insert
  //db.insert('<nome da tabela'>).into(<obj com dados>)
  return db.insert(aviso).into('avisos').then(_ => { return { tipo: "sucesso", corpo: "Dados inseridos com sucesso" }}).catch(erro => {return { tipo: "erro", corpo: "Erro" + erro} 
  })
}//fim do salvar

/**
 * Alterar um aviso cadastrado
  * @param {object} aviso O aviso deve estar no formato:
 * {titulo: <string>, data: <string>, mensagem: <string>}
 * @param {id} id ID do aviso
 * @returns {object} mensagem de sucesso ou erro
 */
function editar(aviso, id){
  return db('avisos').where('ID_avisos', id).update(aviso).then(_ => { return { tipo: "sucesso", corpo: "Aviso alterado com sucesso!" }}).catch(erro => {return { tipo: "erro", corpo: "Erro" + erro} })
}

/** Seleciona todos os avisos cadastrados
 * @returns {object} objeto com todos os avisos cadastrados ou uma mensagem de erro
 */
function selecionarTodos(){
  return db.select('*').from('avisos').then(avisos =>{ return avisos }).catch(erro =>{ return {tipo: "erro", corpo: "Erro: " + erro} })
}//fim do selecionarTodos


/**
 * Seleciona um aviso
 * @param {*} id ID do aviso que será selecionado
 * @return {object} Objeto com o aviso selecionado
 */
function selecionarAviso(id){
  return db.select('*').from('avisos').where('ID_avisos',id).first().then(aviso =>{ return aviso }).catch(erro =>{ return {tipo: "erro", corpo: "Erro: " + erro} })
}//fim do selecionarAviso


/**
 * Função que exclui um aviso do banco de dados
 * @param {int} id id do aviso
 */
function excluir(id){
  return db.del().from('avisos').where('ID_avisos', id);
}

module.exports = {salvar, editar, selecionarTodos, selecionarAviso, excluir}
