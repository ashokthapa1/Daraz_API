var express = require('express');
var router = express.Router();



const restaurant_controller =require('../../api_controller/restaurant_controller');


router.post('/upload',restaurant_controller.uploadImage);

router.get('/addCuisine',restaurant_controller.addCuisine);


module.exports = router;
