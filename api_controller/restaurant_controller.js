const knex = require('knex');
const config = require('../knexfile');
const md5 = require('md5');
var path = require('path');
const dbClient = knex(config);

var jwt = require('jsonwebtoken');
const tokenconfig = require('../config');


const multer = require('multer'); //to upload the image file
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/')
  },
  filename: (req, file, cb) => {
    // console.log(file.originalname);
    // console.log(file.fieldname);
    let ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
});
var upload = multer({ storage: storage }).single('imageFile');



function addCuisine(request, response) {
  const cuisineName = request.body.cuisine_name;
  const cuisinePrice = request.body.cuisine_price;
  const cuisineDescription = request.body.cuisine_description;
  const cuisineImage = request.body.cuisine_image;
  const cuisineCategoryId = request.body.cuisine_category_id;
  dbClient
    .table('cuisine')
    .insert({
      cuisine_name: cuisineName,
      cuisine_price: cuisinePrice,
      cuisine_description: cuisineDescription,
      cuisine_image: cuisineImage,
      cuisine_category_id: cuisineCategoryId
    }).then(data => {
      response.json({
        status: 'success'
      })
    })
    .catch(error => {
      console.log(error);
      response.json({
        status: 'fail',
      })
    })
}

//to upload image
function uploadImage(req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.json(req.file);
  });

}


module.exports = {
 
  'addCuisine': addCuisine,
  'uploadImage': uploadImage,
  

}