const Food = require('../models/food');

const food_index = (req, res) => {
    Food.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index_food', { foods: result, title: 'All Food' });
        })
        .catch(err => {
            console.log(err);
        });
}

const food_details = (req, res) => {
    const id = req.params.id;
    Food.findById(id)
        .then(result => {
            res.render('details_food', { food: result, title: 'Food Details' });
        })
        .catch(err => {
            console.log(err);
        });
}

const food_create_get = (req, res) => {
    res.render('create_food', { title: 'Create a new food review' });
}

const food_create_post = (req, res) => {
    const food = new Food(req.body);
    blog.save()
        .then(result => {
            res.redirect('/foods');
        })
        .catch(err => {
            console.log(err);
        });
}

const food_delete = (req, res) => {
    const id = req.params.id;

    Food.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/foods' });
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = {
    food_index,
    food_details,
    food_create_get,
    food_create_post,
    food_delete
}