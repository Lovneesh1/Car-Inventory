const express = require('express');
const Car = require('../model/car');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('cars/new');
});

router.get('/edit/:id', async (req, res) => {
    const car = await Car.findById(req.params.id);
    res.render('cars/edit', {car: car});
});


router.get('/:id',async (req,res) => {
    const car = await Car.findById(req.params.id);
    if (car == null) res.redirect('/')
    res.render('cars/show', {car: car});
});

router.post('/', async (req,res,next) => {
    req.car = new Car()
    next()
}, saveCarAndRedirect('new'))

router.put('/:id', async (req,res,next) => {
    req.car = await Car.findById(req.params.id)
    next()
}, saveCarAndRedirect('edit'))


router.delete('/:id', async (req, res) => {
    await Car.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

function saveCarAndRedirect(path) {
    return async (req, res) => {
        let car = req.car
            car.car_brand = req.body.car_brand,
            car.car_model = req.body.car_model,
            car.car_age = req.body.car_age
        try {
            car = await car.save();
            res.redirect(`/cars/${car.id}`)
        } catch (e) {
            console.log(e);
            res.render(`cars/${path}`, {car: car})
        }
    }
}

module.exports = router;