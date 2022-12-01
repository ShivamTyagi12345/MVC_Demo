const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Dog = require('./models/dog');
const Food = require('./models/food');
const dogRoutes = require('./routes/dogRoutes');
const foodRoutes = require('./routes/foodRoutes');
// express app
const app = express();


require('dotenv').config();
// console.log(process.env.MONGO_URL);


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(process.env.PORT||3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// mongoose & mongo tests


app.get('/all-dogs', (req, res) => {
  Dog.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/all-foods', (req, res) => {
  Food.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/dogs', (req, res) => {
    // console.log(req.body);
    const dog = new Dog(req.body);
  
    dog.save()
      .then(result => {
        res.redirect('/dogs');
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.post('/foods', (req, res) => {
    // console.log(req.body);
    const food = new Food(req.body);
  
    food.save()
      .then(result => {
        res.redirect('/foods');
      })
      .catch(err => {
        console.log(err);
      });
  });




app.get('/', (req, res) => {
  res.redirect('/dogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

//Dog routes
app.use('/dogs', dogRoutes);
app.use('/foods', foodRoutes);


// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
