// get player bet, receive what they did
    // store each bet for each player int
// call get player bet for next person,
// check if bets are equal
    // round ends when player bets are all equal
    // if p2 doesnt match p1 bet, fold

// betting ends if
    // every player 
        // folded
        // all amounts matched
    // bet - make first bet
    // check - no bet
    // fold - drop out

    // call - 
    // raise - 

// min bet 
// round down ints

// p1.bet is the value of the element

var numPlayers = 4;
//let playerArray = new Array(4);

//initial amt of money, can do better l8r
//var playerFunds = [100, 100, 100, 100];
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
    if (checkRoundOver(betAmount, playerIndex, numPlayers) == true){
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

    if (checkRoundOver(betAmount, playerIndex, numPlayers, round)){
        round ++;
        return [round];
    } 
    return [playerFunds, betAmount, bigPot, round];
}

function fold(playerIndex, betAmount){
    // remove folded player from array for checking 
    // returns -1 if player folds
    betAmount[playerIndex] = -1;
    return [betAmount];
}

function call(playerIndex, numPlayers, playerFunds, betAmount, bigPot, round){
    temp = betAmount[playerIndex];
    playerIndex = playerIndex % numPlayers;
    // increase bet amount to the previous players bet amount
    let prevPlayerIndex = (playerIndex - 1) % numPlayers;
    
    betAmount[playerIndex] = betAmount[prevPlayerIndex];
    
    // player funds subtracted by difference between new bet amount and old bet amount
    difference = (betAmount[playerIndex] - temp);
    playerFunds[playerIndex] -= difference;
    bigPot[0] += difference;

    if (checkRoundOver(betAmount, playerIndex, numPlayers)){
        round ++;
    }
    return [playerFunds, bigPot, betAmount, round];
}

function check(){
    // pass
    if (checkRoundOver(betAmount, playerIndex, numPlayers, round)){
        round++;
        return [round];
    } 
}
function checkRoundOver(betAmount, playerIndex, numPlayers){
// returns new round num if round over, 0 if not
    let roundCount = 0;
    for (let i = 0; i < numPlayers; i++){
        // 
        let nextPlayerIndex = (playerIndex + i) % numPlayers;
       // console.log("player index: ", nextPlayerIndex);
       // console.log("bet amount: ", betAmount[nextPlayerIndex]);
        if (betAmount[playerIndex] === betAmount[nextPlayerIndex]) {
            roundCount++;
        } else {
            break; // If any bet amount doesn't match, exit the loop
        }
    }
    if (roundCount === 4){
        return true;
    }
}

var betToMatch = 0;

//
var betAmount = [0,0,0,0];
var bigPot = [0];
var playerFunds = [400,400,400,400];

getPlayerBet(10, 0, playerFunds, betAmount, bigPot, round);
//console.log("player funds: %d bet amount: %d bigpot: %d", playerFunds, betAmount, bigPot);

getPlayerBet(10, 1, playerFunds, betAmount, bigPot, round);
//console.log(playerFunds, betAmount, bigPot);

call(2, numPlayers, playerFunds, betAmount, bigPot, round);
console.log("player funds: ", playerFunds);
console.log("bet amount:", betAmount);
console.log("big pot", bigPot);
console.log("round", round);
//getPlayerBet(10, 3, playerFunds, betAmount, bigPot, round);
folded = fold(3, betAmount);
console.log("player funds: ", playerFunds);
console.log("bet amount:", betAmount);
console.log("big pot", bigPot);
console.log("round", folded);
//console.log(checkRoundOver);










/*

// NOTE:::::: everytime new round, need to reset round bets bet to match
function getPlayerBet1(bet, playerFunds, playerIndex, roundBets, bigPot, smallPot, round){ // playerarray
    // betting ends if
        // every player 
            // folded
            // all amounts matched
    // bet - make first bet
    // fold - drop out
    // call - match highest bet 
    // raise - matching bets

    // if all matching then round over

        // 0 1 2 3 0 loop
        // first bet
    var roundCount = 0;
    // set round bet value to player 
    roundBets[playerIndex] += bet; 
    //  fold ,  
      
    // if bet or pass 
    if (bet != -1){
         // deduct bet amt from funds
        playerFunds[playerIndex] -= bet;
        // add to total bets
        bigPot[playerIndex] += bet;
        // reset highest bet in round
        if (bet >= betToMatch){
            betToMatch = bet;
        }
        
        // check if everyone same , if so round over, if not, round keep going
        for(var i = 0; i < playerFunds.length; i++){
            playerIndex = playerIndex % playerFunds.length;
            // check if all same
            if (roundBets[playerIndex] == betToMatch || roundBets[playerIndex] == -1){
                roundCount++;
                // if everyone same, then round over
                if(roundCount == playerFunds.length){
                    round ++;
                    return [playerFunds, bigPot, round];
                }
            } else{
                break;
            }
        }
        // if not everyone same, round not over 
        // bet less than last guy, all in: small pot
        if (bet <= betToMatch && playerFunds[playerIndex] == 0){
            // need to change
            
            return [playerFunds, bigPot, roundBets, round];
        }
    }
}

// when button pressed, 


//[p1, bigPot, roundBets, roundNum] = getPlayerBet(-1, playerFunds, 0, roundBets, bigPot, smallPot, roundNum);
//console.log(p1);
//[p2, bigPot, roundBets, roundNum] = getPlayerBet(0, playerFunds, 1, roundBets, bigPot, smallPot, roundNum)
//console.log('player array: ', p2);
//console.log('round: ', myRound + 1);
// so if 

*/

