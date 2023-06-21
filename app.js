const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb://recipeapp:xTKlehSHPu1jSTKUDE06ed30m0Sv8gEuP2Z64IdGI7dxuTHVzjKYVZc1tHjjJ72KUfzbpI50sFJ2ACDbT9IVZQ==@recipeapp.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@recipeapp@';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/main', requireAuth, (req, res) => res.render('main'));
app.get('/calories', requireAuth, (req, res) => res.render('calories'));
app.get('/faq', requireAuth, (req, res) => res.render('faq'));
app.use(authRoutes);