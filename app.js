const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Dog = require('./models/dog');
const dogRoutes = require('./routes/dogRoutes');
// express app
const app = express();


require('dotenv').config();
// console.log(process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
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
app.get('/add-dog', (req, res) => {
  const dog = new Dog({
    title: 'new dog 2',
    snippet: 'about my new dog',
    body: 'more about my new dog'
  })

  dog.save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/all-dogs', (req, res) => {
  Dog.find()
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

app.get('/single-dog', (req, res) => {
  Dog.findById('62f3480581ae55fc243f7dae')
    .then(result => {
      res.send(result);
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


// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});