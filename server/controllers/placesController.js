const Place = require('../models/place');
const location = require('../utills/location');

exports.getAll = async (req, res, next) => {
    try {
        const places = await Place.find();
        return res.status(200).json(places);
    } catch (error) {
        return res.status(400).json(error);
    }
}

exports.getById = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const userPlaces = await Place.find({ user: userId });
        return res.status(200).json(userPlaces);
    } catch (error) {
        return res.status(400).json(error);
    }
}

exports.postPlace = async (req, res, next) => {
    const { title, description, image, address } = req.body;
    const coordinates = await location(address) || { lat: 31.046051, lng: 34.851612 };
    
    const placeCredentials = {
        user: req.user.id,
        title,
        description,
        image,
        address,
        location: coordinates
    }

    try {
        const newPlace = Place({ ...placeCredentials });
        await newPlace.save();
        return res.status(200).json(newPlace);
    } catch (error) {
        return res.status(400).json(error);
    }
}

exports.deletePlace = async (req, res, next) => {
    const placeId = req.params.id;
    try {
        const removePlace = await Place.findOneAndDelete({ _id: placeId });
        return res.status(200).json(removePlace);
    } catch (error) {
        return res.status(400).json(error);
    }
}

exports.editPlace = async (req, res, next) => {
    const placeId = req.params.id;
    try {
        let place = await Place.findByIdAndUpdate(placeId, req.body, { new: true });
        return res.status(200).json({ place: place });
    } catch (error) {
        return res.status(400).json(error);
    }
}