//requiring the json file, which is the friends.js file in our data folder
var friendsData = require('../data/friends');

module.exports = (app) => {

    //get request for an api of the friends data 
    app.get('/api/friends', (request, response) => {
        response.json(friendsData);
    });
}