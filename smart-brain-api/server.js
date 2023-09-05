const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const {
  PORT,
  DATABASE_URL,
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_DB,
  DATABASE_PORT,
} = process.env;

const db = require('knex')({
  client: 'pg',
  connection: {
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // Esta opción es porque el server es gratis. Pero es una cagada a nivel seguridad.
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_DB,
    port: DATABASE_PORT,
  },
});

// Chunk de codigo que
// le pide toda la info de la tabla users
// a la database smart-brain
// console.log(db.select('*').from('users').then(data => {
//   console.log(data);
// }));

const app = express();

app.use(cors());
app.use(express.json()); //middleware ??

//Cuando el cliente quiera ir a "server-address/" le
//voy a responder con "database.users"
// app.get('/', (req, res) => { res.send(db.users) });

//El cliente mandará los datos para hacer el signin
//y en el servidor se corroborán los datos mandados por
//el cliente req.body.email y req.body.password con los
//de la database,
//El server contestará con un 200 -> success o un 400 error logging in.
app.post('/signin', (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});
//el cliente manda los datos para registrarse al servidor mediante un POST request.
//en el body del POST request está el email, name y password.
//pusheo un objeto con las propiedades id, name, email, password, entries, joined
//a la database. Y luego muestro la respuesta solo a modo demostrativo de que
//se aumentó en un elemento el tamaño de la database.
app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
//El cliente ingresa un /profile/:id y
//si el id coincide con una de la database
//el server devuelve los datos de ese usuario.
app.get('/profile/:id', (req, res, db) => {
  profile.handleProfileGet(req, res, db);
});
// El client hace un PUT request a /image
// le saca el id al body que me manda el server
// para filtrar al usuario con ese id y sumarle
// una "entry".
app.put('/image', (req, res) => {
  image.handleImagePut(req, res, db);
});
app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
