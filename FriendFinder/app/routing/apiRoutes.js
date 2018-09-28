var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var friends = require("../data/friends");
module.exports = function(app) {
app.get("/api/friends", function(req, res) {
    return res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    var newFriend = req.body;
           //console.log(newFriend);

           //saving users imput for compare
           var bestMatch;

           // for sorting input and match for results
           for (var i = 0; i < newFriend.scores.length; i++) {
               if (newFriend.scores[i] == "1") {
                   newFriend.scores[i] = 1;
               } else if (newFriend.scores[i] == "5") {
                   newFriend.scores[i] = 5;
               } else {
                   newFriend.scores[i] = parseInt(newFriend.scores[i]);
               }
           }

           //to compare scores with rest of the friends from array
           var bestMatchIndex = 0;

           //difference variable
           //(biggest diference from 1-5 is 4 multiplied with 10 questions)
           var bestMatchDifference = 40;

           //nested loop for comparing friends from array
           for (var i = 0; i < friends.length; i++) {

               //setting difference variable
               var totalDifference = 0;

               for (var index = 0; index < friends[i].scores.length; index++){
                   var differenceOneScore = Math.abs(friends[i].scores[index] - newFriend.scores[index]);
                   totalDifference += differenceOneScore;
               }
               //if les than the best match save difference and index
               if (totalDifference < bestMatchDifference) {
                   bestMatchIndex = i;
                   bestMatchDifference = totalDifference;
               }
           }
           //best match data from friend
           bestMatch = friends[bestMatchIndex];

           //new friend in array of friends
           friends.push(newFriend);

           //return perfect match
           res.json(bestMatch);
   });
  
}
