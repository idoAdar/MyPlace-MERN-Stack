const axios = require('axios');

const API_KEY = 'AIzaSyDKnM8BEHP_OLcS51yH7YnTPzqFsmcqhy0';

const getCoordsByAddress = async address => {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`);
    
    if (response.data.status === 'ZERO_RESULTS') {
        return;
    }

    const coords = response.data.results[0].geometry.location;
    return coords;
} 

module.exports = getCoordsByAddress;
