const home = document.querySelector("#homen");
const newRoupa = document.querySelector(".newRoupa");
const main = document.querySelector("main");
const form = document.querySelector(".addForm");

const nome = document.querySelector(".name");
const descriçao = document.querySelector(".desc");
const estoque = document.querySelector(".estoque");
const valuecompra = document.querySelector(".valuecomp");
const valuevenda = document.querySelector(".valuevend");
const margem = document.querySelector(".margin");

function newRoup() {
  main.style.display = "none";
  form.style.display = "flex";
}

function homen() {
  form.style.display = "none";
  main.style.display = "block";
}

const pesqRoupas = async () => {
  const connect = await fetch("http://localhost:3030");
  const roupas = await connect.json();
  return roupas;
};

const createRoup = async (event) => {
  event.preventDefault();

  const newRoupas = {
    nome: nome.value,
    descriçao: descriçao.value,
    estoque: estoque.value,
    preço_de_compra: valuecompra.value,
    preço_de_venda: valuevenda.value,
    margen: margem.value,
  };

  nome.value = ""
  descriçao.value = ""
  estoque.value = ""
  valuecompra.value = ""
  valuevenda.value = ""
  margem.value = ""

  await fetch("http://localhost:3030", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(newRoupas),
  });

  main.innerHTML = "";

  loadRoupas();
};

const deleteRoup = async (id) => {
  await fetch(`http://localhost:3030/${id}`, { method: "delete" });

  loadRoupas();
};

const createElement = (tag, innerText = "") => {
  const elemento = document.createElement(tag);

  if (innerText) {
    elemento.innerText = innerText;
  }

  return elemento;
};

const createRow = (roupa) => {
  const {
    id,
    nome,
    descriçao,
    estoque,
    preço_de_compra,
    preço_de_venda,
    margen,
  } = roupa;

  const section = createElement("section");
  const div = createElement("div");

  const nomee = createElement("p", `nome: ${nome}`);
  const descriçaoo = createElement("p", `descriçao: ${descriçao}`);
  const estoquee = createElement("p", `em estoque: ${estoque}`);
  const valorDeCompra = createElement(
    "p",
    `valor de compra: ${preço_de_compra}`
  );
  const preço = createElement("p", `preço: ${preço_de_venda}`);
  const margenn = createElement("p", `margen: ${margen}`);

  const btnDeletar = createElement("button", "deletar");
  const btnEditar = createElement("button", "editar estoque");

  btnDeletar.addEventListener("click", () => deleteRoup(id));

  div.appendChild(nomee);
  div.appendChild(descriçaoo);
  div.appendChild(estoquee);
  div.appendChild(valorDeCompra);
  div.appendChild(preço);
  div.appendChild(margenn);
  div.appendChild(btnDeletar);
  div.appendChild(btnEditar);

  section.appendChild(div);

  return section;
};

const loadRoupas = async () => {
  main.innerHTML = ""

  const roupa = await pesqRoupas();

  roupa.forEach((roupas) => {
    const roups = createRow(roupas);
    main.appendChild(roups);
  });
};

home.addEventListener("click", homen);
newRoupa.addEventListener("click", newRoup);
form.addEventListener("submit", createRoup);

loadRoupas();
