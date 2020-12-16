//conexão com o banco de dados
const db = require("../../knexfile");

/**
 * Inserir um usuário no banco de dados
 * @param {object} usuario O usuario deve estar no formato
 * {nome: <string>, email: <string>, user: <string>, senha: <string>}
 * @returns {object} mensagem de sucesso ou erro
 */
function registrar(usuario) {
  return db
    .insert(usuario)
    .into("usuarios")
    .then((_) => {
      return { tipo: "sucesso", corpo: "Dados inseridos com sucesso" };
    })
    .catch((erro) => {
      return { tipo: "erro", corpo: "Erro" + erro };
    });
} //fim do registrar

function selecionarUsuario(user) {
  return db
  .select("*")
  .into("usuarios")
  .where("user", user);
}
module.exports = { registrar, selecionarUsuario };
