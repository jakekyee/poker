// global variables
var numPlayers = 4;
var roundBets = new Array(numPlayers);
var smallPot = new Array(numPlayers);
let round = 0;
var betToMatch = 0;
var betAmount = [0, 0, 0, 0];
var playerFunds = [400, 400, 400, 400];

var suits = ["s", "c", "h", "d"];
var numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "x", "j", "q", "k", "a"];
var playerHands = [
  ["5_s", "2_c"],
  ["5_s", "2_c"],
  ["5_s", "2_c"],
  ["5_s", "2_c"],
];
var shownCards = ["a_s", "2_d", "4_c", "4_h", "5_d"];

function getPlayerBet(playerIndex, playerFunds, betAmount, bigPot, round){
    bet = document.getElementById("bet").value;
    betAmount[playerIndex] += bet;
    playerFunds[playerIndex] -= bet;
    
    // check if round is over
    if (checkRoundOver(betAmount, playerIndex) == true){
        round ++;
    } 
    return 0;  
}

function raise(playerIndex){
    raise = document.getElementById("raise").value;
    betAmount[playerIndex] += raise;
    playerFunds[playerIndex] -= raise;
    bigPot[0] += raise;

    if (checkRoundOver(betAmount, playerIndex)){
        round ++;
    } 
    return [playerFunds, betAmount, bigPot, round];
}

function fold(playerIndex, betAmount, round){
    // remove folded player from array for checking 
    // returns -1 if player folds
    betAmount[playerIndex] = -1;
     if (checkRoundOver(betAmount, playerIndex)){
        round ++;
    }
    return [betAmount, round];

}

function call(playerIndex, numPlayers, playerFunds, betAmount, bigPot, round){
    temp = betAmount[playerIndex];
    playerIndex = playerIndex % numPlayers;
    let prevPlayerIndex = (playerIndex - 1) % numPlayers;
    // increase bet amount to the previous players bet amount
    betAmount[playerIndex] = betAmount[prevPlayerIndex];
    
    // player funds subtracted by difference between new bet amount and old bet amount
    difference = (betAmount[playerIndex] - temp);
    console.log("difference ", difference);
    playerFunds[playerIndex] -= difference;
    bigPot[0] += difference;

    if (checkRoundOver(betAmount, playerIndex)){
        round ++;
    }
    return [playerFunds, bigPot, betAmount, round];
}

function check(){
    // pass
    if (checkRoundOver(betAmount, playerIndex)){
        round++;
        return [round];
    } 
}


