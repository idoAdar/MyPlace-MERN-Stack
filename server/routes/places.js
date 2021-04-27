const express = require('express');
const isAuth = require('../middleware/isAuth');
const controller = require('../controllers/placesController');

const route = express.Router();

// Url: http://localhost:5000/api/places
// Method: GET
// Desc: Fetch All Places
// Public
route.get('/', controller.getAll);

// Url: http://localhost:5000/api/places/edit-place/:id
// Method: PUT
// Desc: Edit Existing Place
// Private
route.put('/edit-place/:id', isAuth, controller.editPlace);

// Url: http://localhost:5000/api/places/new-place
// Method: POST
// Desc: Create New Place
// Private
route.post('/new-place', isAuth, controller.postPlace);

// Url: http://localhost:5000/api/places/:id
// Method: GET
// Desc: Fetch User Places
// Public
route.get('/:id', controller.getById);

// Url: http://localhost:5000/api/places/remove/:id
// Method: DELETE
// Desc: Delete Single Place
// Private
route.delete('/remove/:id', isAuth, controller.deletePlace);

module.exports = route;