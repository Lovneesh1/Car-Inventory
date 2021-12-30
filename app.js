const express = require('express');
const mongoose = require('mongoose');
const Car = require('./model/car');
const carRouter = require('./routes/cars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb+srv://kerem:kerem123@clusterkerem.fdn6w.mongodb.net/finalProject?retryWrites=true&w=majority')

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));


app.get('/', async (req, res) => {
    const cars = await Car.find();
    res.render('cars/index', { cars: cars});
});


app.use('/cars', carRouter);
app.listen(5000);