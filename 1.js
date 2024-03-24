
var numPlayers = 4;
var roundBets = new Array(numPlayers);
//var bigPot = new Array(numPlayers);
var smallPot = new Array(numPlayers);
let round = 0;
var betToMatch = 0;

//
var betAmount = [0,0,0,0];
var bigPot = [0];
var playerFunds = [400,400,400,400];

function getPlayerBet(playerIndex, playerFunds, betAmount, bigPot, round){
    bet = document.getElementById("bet").value;
    betAmount[playerIndex] += bet;
    playerFunds[playerIndex] -= bet;
    bigPot[0] += bet;
    
    // check if round is over
    if (checkRoundOver(betAmount, playerIndex) == true){
        round ++;
    } 
    //console.log("test round: ", playerFunds, betAmount, bigPot, round);
    return [playerFunds, betAmount, bigPot, round];  
}

function raise(playerIndex, playerFunds, betAmount, bigPot, round){
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
function checkRoundOver(betAmount, playerIndex){
// returns new round num if round over, 0 if not
let firstPositiveValue = -1; // Initialize with an invalid value
for (let i = 0; i < betAmount.length; i++) {
    if (betAmount[i] != -1) {
        firstPositiveValue = betAmount[i];
        break;
    }
}

if (firstPositiveValue == -1) {
    // If there are no positive values in the array, return true
    return true;
}

for (let i = 0; i < betAmount.length; i++) {
    if (betAmount[i] != -1 && betAmount[i] != firstPositiveValue) {
        return false; // If any non-negative value is different, return false
    }
}

return true; // All non-negative values are the same
/*

    let roundCount = 0;
    for (let i = 0; i < betAmount.length; i++){
        // 
        let nextPlayerIndex = (playerIndex + i) % betAmount.length;
       // console.log("player index: ", nextPlayerIndex);
       // console.log("bet amount: ", betAmount[nextPlayerIndex]);
        if (betAmount[playerIndex] === betAmount[nextPlayerIndex] || (betAmount[playerIndex] === -1 || betAmount[nextPlayerIndex] === -1)) {
            roundCount++;
        } else {
            break; // If any bet amount doesn't match, exit the loop
        }
    }
    //console.log("betamount " ,betAmount);
    if (roundCount === 4){
        return true;
    } else {
        return false;
    }
*/   
   

}

//
var betAmount = [0,0,0,0];
var bigPot = [0];
var playerFunds = [400,400,400,400];

getPlayerBet(10, 0, playerFunds, betAmount, bigPot, round);
//console.log("player funds: %d bet amount: %d bigpot: %d", playerFunds, betAmount, bigPot);
console.log("player funds: ", playerFunds);
console.log("bet amount:", betAmount);
console.log("big pot", bigPot);
console.log("round", round);
getPlayerBet(10, 1, playerFunds, betAmount, bigPot, round);
//console.log(playerFunds, betAmount, bigPot);

call(2, numPlayers, playerFunds, betAmount, bigPot, round);
console.log("player funds: ", playerFunds);
console.log("bet amount:", betAmount);
console.log("big pot", bigPot);
//getPlayerBet(10, 3, playerFunds, betAmount, bigPot, round);
folded = fold(3, betAmount, round);
console.log("player funds: ", playerFunds);
console.log("bet amount:", betAmount);
console.log("big pot", bigPot);
console.log("round:: ", folded);
//console.log("round", folded);
//console.log(checkRoundOver);











