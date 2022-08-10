const Dog = require('../models/dog');

const dog_index = (req, res) => {
    Dog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { dogs: result, title: 'All Dogs' });
        })
        .catch(err => {
            console.log(err);
        });
}

const dog_details = (req, res) => {
    const id = req.params.id;
    Dog.findById(id)
        .then(result => {
            res.render('details', { dog: result, title: 'Dog Details' });
        })
        .catch(err => {
            console.log(err);
        });
}

const dog_create_get = (req, res) => {
    res.render('create', { title: 'Create a new Dog' });
}

const dog_create_post = (req, res) => {
    const dog = new Dog(req.body);
    blog.save()
        .then(result => {
            res.redirect('/dogs');
        })
        .catch(err => {
            console.log(err);
        });
}

const dog_delete = (req, res) => {
    const id = req.params.id;

    Dog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/dogs' });
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = {
    dog_index,
    dog_details,
    dog_create_get,
    dog_create_post,
    dog_delete
}