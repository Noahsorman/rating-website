//The playerlist. Should be stored somewhere else..
var playerlist = {
    "mikka": {
        "rating":1652,
        "main":"Mewtwo"
    },
    "ltr": {
        "rating":1644,
        "main":"Cloud"
    },
    "izizaki": {
        "rating":1542,
        "main":"Zss"
    },
    "barre": {
        "rating":1521,
        "main":"Cloud"
    },
    "izizaki": {
        "rating":1542,
        "main":"Zss"
    },
    "finch": {
        "rating":1519,
        "main":"Zss"
    },
    "chagzter": {
        "rating":1514,
        "main":"Duck hunt duo"
    },
    "kp57": {
        "rating":1513,
        "main":"Kirby"
    },
    "abbe": {
        "rating":1508,
        "main":"Kirby"
    },
    "anttown": {
        "rating":1506,
        "main":"Cloud"
    },
    "mangz": {
        "rating":1497,
        "main":"Ganondorf"
    },
    "frudrunq": {
        "rating":1494,
        "main":"Ganondorf"
    },
    "avvan": {
        "rating":1483,
        "main":"Bowser"
    },
    "zeor": {
        "rating":1483,
        "main":"Toon link"
    },
    "r": {
        "rating":1483,
        "main":"Falco"
    },
    "bagz": {
        "rating":1481,
        "main":"Bowser"
    },
    "chog": {
        "rating":1477,
        "main":"Ike"
    },
    "eb0la": {
        "rating":1466,
        "main":"Link"
    },
    "miley": {
        "rating":1465,
        "main":"Sonic"
    },
    "jukdk": {
        "rating":1460,
        "main":"Ganondorf"
    },
    "jäger": {
        "rating":1457,
        "main":"Marth"
    },
    "yolowille": {
        "rating":1457,
        "main":"Ike"
    },
    "ymg": {
        "rating":1456,
        "main":"Bayonetta"
    },
    "habo": {
        "rating":1439,
        "main":"?"
    },
    "mc": {
        "rating":1435,
        "main":"Meta knight"
    },
    "js": {
        "rating":1387,
        "main":"Kirby"
    },
    "cpt.kön": {
        "rating":1387,
        "main":"?"
    }
}
//Temporary ratings to update the ratings above
var temp1, temp2, temp3, temp4 = 0;

//Calculates the win percentage of team 1
function calcwinper(){
    var player = [0,1,2,3,4];
    for(i = 1; i < 5; i++){
        player[i] = playerlist[(document.getElementById("user_player" + i).value).toLowerCase()].rating;
    }
    var winningPercentage = parseInt((1 / (1 + Math.pow(10, (player[3] + player[4] - (player[1] + player[2])) / 400)))*100);
    document.getElementById("team1wP").innerHTML = "||  " + winningPercentage + "% chance of winning";
    winningPercentage = 100 - winningPercentage;
    document.getElementById("team2wP").innerHTML = "||  " + winningPercentage + "% chance of winning";
}

//Retrieves an array that shows the match scores. (ex [1,0,0] for a best of three where team 1 won the first game but lost the other two)
function matchscore(){
    var score = [];
    var sum = 0;
    var bestof = parseInt(document.getElementById("bestof").value);
    for (var i = 0; i < bestof; i++){
        if(document.getElementById("match" + i).checked == true){
            score[i] = 1;
        }else{
            score[i] = 0;
        }
        sum += score[i];
        if(sum > bestof / 2 || sum + bestof - (i + 1) < bestof / 2){
            break;
        }
    }
    return score;
}

//Retrieves the entered player's rating to the website.
function findPlayer(n){
    var player = (document.getElementById("user_player" + n).value).toLowerCase();
    document.getElementById("rating" + n).innerHTML= playerlist[player].rating;
    document.getElementById("main" + n).innerHTML= playerlist[player].main;
    if (n % 2 == 0){
        document.getElementById("team" + (n/2) + "_rating").innerHTML = parseInt((playerlist[player].rating + playerlist[(document.getElementById("user_player" + (n-1)).value).toLowerCase()].rating) / 2);
    }
    calcwinper();
}

//Work in progress. Does nothing right now.
function findtable_player(){
    var myTab = document.getElementById("content-table");
    var row = 1;
    var objCells = myTab.1.item(0)
    var player = ((document.getElementById(objCells).value).toString()).toLowerCase;
    document.getElementById("tPlayer_2_rating").innerHTML= playerlist[player].rating;
}

//The main function that calculates the new ratings for every player after n amount of games
function hocusPocus(){
    var scores = matchscore();
    document.getElementById("matchx").innerHTML= "The match scores: " + scores;
    calculateNewRating(scores);
}

//Calculates the new ratings for all four players and assign them to the global temp-values
function calculateNewRating(scores){
    var team1 = [playerlist[(document.getElementById("user_player1").value).toLowerCase()].rating, playerlist[(document.getElementById("user_player2").value).toLowerCase()].rating]
    var team2 = [playerlist[(document.getElementById("user_player3").value).toLowerCase()].rating, playerlist[(document.getElementById("user_player4").value).toLowerCase()].rating]
    for (var i = 0; i < scores.length; i++){
        var team1Sum = team1[0] + team1[1];
        var team2Sum = team2[0] + team2[1];
        var wP = Math.round((1 / (1 + Math.pow(10, (team2[0] + team2[1] - (team1[0] + team1[1])) / 400)))*100);
        var dif = Math.round((-2*wP/10)+20)*scores[i]-Math.round((-2*(100-wP)/10)+20)*(1-scores[i]);
        var p1s = Math.round(Math.pow(-(Math.pow(((1/(1+Math.pow(10,((team2Sum/2 - team1[0])/400))))*100)-50,2)/(500/4))+20,3));
        var p2s = Math.round(Math.pow(-(Math.pow(((1/(1+Math.pow(10,((team2Sum/2 - team1[1])/400))))*100)-50,2)/(500/4))+20,3));
        var p3s = Math.round(Math.pow(-(Math.pow(((1/(1+Math.pow(10,((team1Sum/2 - team2[0])/400))))*100)-50,2)/(500/4))+20,3));
        var p4s = Math.round(Math.pow(-(Math.pow(((1/(1+Math.pow(10,((team1Sum/2 - team2[1])/400))))*100)-50,2)/(500/4))+20,3));
        team1[0] = Math.round(team1[0] + p1s/(p1s + p2s)*dif);
        team1[1] = Math.round(team1[1] + p2s/(p1s + p2s)*dif);
        team2[0] = Math.round(team2[0] + p3s/(p3s + p4s)*(-dif));
        team2[1] = Math.round(team2[1] + p4s/(p3s + p4s)*(-dif));
    }
    document.getElementById("newrating1").innerHTML = document.getElementById("user_player1").value + "'s new rating is:" + team1[0];
    temp1 = team1[0];
    document.getElementById("newrating2").innerHTML = document.getElementById("user_player2").value + "'s new rating is:" + team1[1];
    temp2 = team1[1];
    document.getElementById("newrating3").innerHTML = document.getElementById("user_player3").value + "'s new rating is:" + team2[0];
    temp3 = team2[0];
    document.getElementById("newrating4").innerHTML = document.getElementById("user_player4").value + "'s new rating is:" + team2[1];
    temp4 = team2[1];
}

//Checks if a set of games is already lost. (ex If team 1 loses the first two games in a bo3, the third game never happened) 
function lookIfBreak(scores, n, bestof){
    var sum = 0;
    for (var i = 0; i < n; i++){
        sum += scores[i];
    }
    return (sum > bestof / 2 || sum + bestof - n < bestof / 2) ? true : false;
}

//Updates the ratings after a user hits "confirm" new ratings
function updateRatings(){
playerlist[(document.getElementById("user_player1").value).toLowerCase()].rating = temp1;
playerlist[(document.getElementById("user_player2").value).toLowerCase()].rating = temp2;
playerlist[(document.getElementById("user_player3").value).toLowerCase()].rating = temp3;
playerlist[(document.getElementById("user_player4").value).toLowerCase()].rating = temp4;
document.getElementById("showconfirmed").innerHTML = "Confirmed.";
for(var i = 1; i < 5; i++){
    findPlayer(i);
    }
}
