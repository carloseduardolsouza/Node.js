//rodar o servidor
const app = require("./app");
const port = 3300;

//Header("Access-Control-Allow-Origin: *");

app.listen(port, () => {
  console.log(`Server run in localhoost:${port}`);
});
