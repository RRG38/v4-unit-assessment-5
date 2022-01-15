require('dotenv').config();
const massive = require('massive')
const express = require('express'),
      userCtrl = require('./controllers/user'),
      postCtrl = require('./controllers/posts')


const app = express();

const { CONNECTION_STRING, SERVER_PORT } = process.env

app.use(express.json());

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then(db => {
  app.set('db', db);
  console.log('DB connection established!');
}).catch(err => {
  console.log(`Error connecting to DB: ${err}`);
})

//Auth Endpoints
// app.post('/api/auth/register', userCtrl.register);
// app.post('/api/auth/login', userCtrl.login);
// app.get('/api/auth/me', userCtrl.getUser);
// app.post('/api/auth/logout', userCtrl.logout);

// //Post Endpoints
// app.get('/api/posts', postCtrl.readPosts);
// app.post('/api/post', postCtrl.createPost);
// app.get('/api/post/:id', postCtrl.readPost);
// app.delete('/api/post/:id', postCtrl.deletePost)

app.listen(SERVER_PORT, _ => console.log(`running on ${SERVER_PORT}`));