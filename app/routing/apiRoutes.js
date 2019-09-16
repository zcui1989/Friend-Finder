var friendsData = require('../data/friends');

module.exports = (app) => {

    app.get('/api/friends', (request, response) => {
        response.json(friendsData);
    });

    app.post('/api/friends', (request, response) => {
        var totalDifference = 0,
            matchingFriends = {
                name : '',
                friendsDifference : 1000
            },

            userData = request.body,
            userName = userData.name,
            userScores = userData.scores,

            convertedScores = userScores.map((n)=>{
                return parseInt(n, 10);
            });

            userData = {
                name : request.body.name,
                scores : convertedScores
            }

        var totalScore = convertedScores.reduce((a, b) => a + b, 0);

        for(var x in friendsData){
            totalDifference = 0;

            var friendScore = friendsData[x].scores.reduce((a, b) => a + b, 0);
            
            totalDifference += Math.abs(totalScore - friendScore);

            if (totalDifference <= matchingFriends.friendsDifference){
                matchingFriends.name = friendsData[x].name; 
                matchingFriends.friendsDifference = totalDifference;
            } 
        }

        friendsData.push(userData);
        response.json(matchingFriends);
    });



}