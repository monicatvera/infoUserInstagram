const https = require("https");
require("dotenv").config();

const accessToken = process.env.ACCESS_TOKEN; // Obtiene el Access Token de las variables de entorno
const username = process.env.USERNAME; // Obtiene el nombre de usuario del usuario que deseas obtener información de las variables de entorno

const options = {
  hostname: "api.instagram.com",
  path: `/v1/users/search?q=${username}&access_token=${accessToken}`,
  method: "GET",
};

const req = https.request(options, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    const user = JSON.parse(data).data[0]; // Obtiene el primer usuario que coincide con la búsqueda

    console.log(`Nombre de usuario: ${user.username}`);
    console.log(`Nombre completo: ${user.full_name}`);
    console.log(`ID: ${user.id}`);
    console.log(`Seguidores: ${user.counts.followed_by}`);
    console.log(`Siguiendo: ${user.counts.follows}`);
    console.log(`Publicaciones: ${user.counts.media}`);
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.end();
