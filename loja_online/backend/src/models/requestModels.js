const dataBase = require("./conection");

const getAll = async () => {
  const all = await dataBase.execute("SELECT * FROM roupas");
  return all;
};

const addRopas = async (roup) => {
  const { nome, descriçao, estoque, preço_de_compra,preço_de_venda , margen} = roup;

  const key = "INSERT INTO ROUPAS (nome , descriçao , estoque,preço_de_compra,preço_de_venda,margen) VALUES (? , ? , ? , ? , ? , ?)";
  const [add] = await dataBase.execute(key, [nome, descriçao, estoque, preço_de_compra, preço_de_venda , margen]);

  return { onRoupa: nome };
};

const upRoupas = async (id, estoque1) => {
  const {estoque} = estoque1

  const key = "UPDATE roupas SET estoque = ? WHERE id = ?"
  const [up] = await dataBase.execute(key, [estoque, id])

  return up
}

const deleteRoupa = async (id) => {
  const key = "DELETE FROM roupas WHERE id = ?"
  const del = await dataBase.execute(key, [id])

  return del
}

module.exports = {
  getAll,
  addRopas,
  upRoupas,
  deleteRoupa
};
