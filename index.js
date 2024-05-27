import express from "express";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import _ from "lodash";
import chalk from "chalk";

moment.locale("es");
const app = express();
const PORT = 3000;

//server start
app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});

//ruta principal
const usuarios = [];
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://randomuser.me/api");
    const datos = response.data.results;
    const usuario = {
      nombre: datos[0].name.first,
      apellido: datos[0].name.last,
      genero: datos[0].gender,
      id: uuidv4().slice(0, 8),
      timestamp: moment().format("LLLL"),
    };
    usuarios.push(usuario);

    //Separar los usuarios por genero
    const usuariosH = _.filter(usuarios, { genero: "male" });
    const usuariosM = _.filter(usuarios, { genero: "female" });
    let listaUsuariosH = "";
    let listaUsuariosM = "";
    usuariosH.forEach((element) => {
      listaUsuariosH += `<li>Nombre: ${element.nombre} - Apellido: ${element.apellido} - ID: ${element.id} - Timestamp: ${element.timestamp}</li>\n`;
    });
    usuariosM.forEach((element) => {
      listaUsuariosM += `<li>Nombre: ${element.nombre} - Apellido: ${element.apellido} - ID: ${element.id} - Timestamp: ${element.timestamp}</li>\n`;
    });
    res.send(
      `<h5>Hombres</h5>
        <ul>
          ${listaUsuariosH}
        </ul>
      <h5>Mujeres</h5>
        <ul>
          ${listaUsuariosM}
        </ul>`
    );

    //Imprimir las mismas 2 listas en consola usando chalk
    console.log(chalk.bgWhite.blue(`Hombres\n${listaUsuariosH}`));
    console.log(chalk.bgWhite.blue(`Mujeres\n${listaUsuariosM}`));
  } catch (error) {
    console.log(error);
  }
});
