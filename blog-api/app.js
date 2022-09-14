const express = require('express'); // Import express, a lightweight framework
const app = express(); // Init express and same it to "app" variable
const mongoose = require('mongoose'); // Import mongoose, used for handling DB and giving NoSQL DB such as MongoDB, the abilities of a relational DB such as MySQL
const bodyParser = require('body-parser'); // Import for handling different formats
const cors = require('cors'); // Import for handling cross-origin requests
// require('dotenv/config');                   // Import

// MIDDLEWARES
// app.use('/posts', () => {
//     console.log('This is a middleware running');
// });

app.use(cors()); // Allowing cross-origin requests
app.use(bodyParser.json()); // Format data to JSON

// Import routes
const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);

// ROUTES, simple exampleon how routes works
app.get('/', (req, res) => {
  res.send('We are on home');
});

// app.get('/posts', (req, res) => {
//     res.send('Display a list of posts');
// });

// const Post = require('./models/Post');
// app.get('/posts', (req, res) => {
//     const posts = await Post.find();
//     res.send(posts);
// });

// app.get('/contact', (req, res) => {
//     res.send('Contact page');
// });

// Connect DB
mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connected to DB')
);

// How do we start listeneing to the server
app.listen(5000); // the port to listen to
