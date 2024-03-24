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
var betAmount = [0, 0, 0, 0];
var bigPot = [0];
var playerFunds = [400, 400, 400, 400];

function getPlayerBet(playerIndex, playerFunds, betAmount, bigPot, round) {
  bet = document.getElementById("bet").value;
  betAmount[playerIndex] += bet;
  playerFunds[playerIndex] -= bet;
  bigPot[0] += bet;

  // check if round is over
  if (checkRoundOver(betAmount, playerIndex, numPlayers) == true) {
    round++;
  }
  //console.log("test round: ", playerFunds, betAmount, bigPot, round);
  return [playerFunds, betAmount, bigPot, round];
}

function raise(playerIndex, playerFunds, betAmount, bigPot, round) {
  raise = document.getElementById("raise").value;
  betAmount[playerIndex] += raise;
  playerFunds[playerIndex] -= raise;
  bigPot[0] += raise;

  if (checkRoundOver(betAmount, playerIndex, numPlayers, round)) {
    round++;
    return [round];
  }
  return [playerFunds, betAmount, bigPot, round];
}

function fold(playerIndex, betAmount) {
  // remove folded player from array for checking
  // returns -1 if player folds
  betAmount[playerIndex] = -1;
  return [betAmount];
}

function call(playerIndex, numPlayers, playerFunds, betAmount, bigPot, round) {
  temp = betAmount[playerIndex];
  playerIndex = playerIndex % numPlayers;
  // increase bet amount to the previous players bet amount
  let prevPlayerIndex = (playerIndex - 1) % numPlayers;

  betAmount[playerIndex] = betAmount[prevPlayerIndex];

  // player funds subtracted by difference between new bet amount and old bet amount
  difference = betAmount[playerIndex] - temp;
  playerFunds[playerIndex] -= difference;
  bigPot[0] += difference;

  if (checkRoundOver(betAmount, playerIndex, numPlayers)) {
    round++;
  }
  return [playerFunds, bigPot, betAmount, round];
}

function check() {
  // pass
  if (checkRoundOver(betAmount, playerIndex, numPlayers, round)) {
    round++;
    return [round];
  }
}
function checkRoundOver(betAmount, playerIndex, numPlayers) {
  // returns new round num if round over, 0 if not
  let roundCount = 0;
  for (let i = 0; i < numPlayers; i++) {
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
  if (roundCount === 4) {
    return true;
  }
}

var betToMatch = 0;

//
var betAmount = [0, 0, 0, 0];
var bigPot = [0];
var playerFunds = [400, 400, 400, 400];

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

// Functions to determine Hand Hierarchy

// global variables
suits = ["s", "c", "h", "d"];
numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "x", "j", "q", "k", "a"];
playerHands = [
  ["5_s", "2_c"],
  ["5_s", "2_c"],
  ["5_s", "2_c"],
  ["5_s", "2_c"],
];
shownCards = ["a_s", "2_d", "4_c", "4_h", "5_d"];

// handHierarchy function
function handHierarchy(shownCards, hands, playerCount) {
  const hierarchy = {};
  const handStrengths = {};
  let strength;

  for (let player = 0; player < playerCount; player++) {
    strength = handStrength(hands[player], shownCards);
    [hierarchy, handStrengths] = addPlayer(
      player,
      strength,
      handStrengths,
      hierarchy
    );
  }

  return hierarchy;
}

// addPlayer function
function addPlayer(player, handStrength, handStrengths, hierarchy) {
  let i = 0;
  while (handStrength < handStrengths[i] && handStrength != handStrengths[i]) {
    i++;
  }

  if (handStrength == handStrengths[i]) {
    // if it is in range of two pair
    if (handStrength > 299 && handStrength < 2701) {
      if (
        playerHands[player][0].charAt(0) == playerHands[player][1].charAt(0) ||
        handStrength ==
          numbers.indexOf(playerHands[player][0].charAt(0)) +
            2 +
            numbers.indexOf(playerHands[player][1].charAt(0)) +
            2
      ) {
        // tie
        const newHierarchy = [
          ...hierarchy.slice(0, i),
          "tie_" + hierarchy[i] + "_p" + player.toString(),
          ...hierarchy.slice(i + 1),
        ];
        return [newHierarchy, handStrengths];
      } else if (
        playerHands[player][0].charAt(0) ==
        playerHands[parseInt(hierarchy[i].charAt(2))][0].charAt(0)
      ) {
        if (
          numbers.indexOf(playerHands[player][1].charAt(0)) + 2 >
          numbers.indexOf(
            playerHands[parseInt(hierarchy[i].charAt(1))][0].charAt(0)
          ) +
            2
        ) {
          // i remains the same
        } else if (
          numbers.indexOf(playerHands[player][1].charAt(0)) + 2 ==
          numbers.indexOf(
            playerHands[parseInt(hierarchy[i].charAt(1))][0].charAt(0)
          ) +
            2
        ) {
          // tie
          const newHierarchy = [
            ...hierarchy.slice(0, i),
            "tie_" + hierarchy[i] + "_p" + player.toString(),
            ...hierarchy.slice(i + 1),
          ];
          return [newHierarchy, handStrengths];
        } else if (
          numbers.indexOf(playerHands[player][1].charAt(0)) + 2 <
          numbers.indexOf(
            playerHands[parseInt(hierarchy[i].charAt(1))][0].charAt(0)
          ) +
            2
        ) {
          i++;
        }
      } else {
        if (
          numbers.indexOf(playerHands[player][0].charAt(0)) + 2 >
          numbers.indexOf(
            playerHands[parseInt(hierarchy[i].charAt(1))][0].charAt(0)
          ) +
            2
        ) {
          // i remains the same
        } else if (
          numbers.indexOf(playerHands[player][0].charAt(0)) + 2 ==
          numbers.indexOf(
            playerHands[parseInt(hierarchy[i].charAt(1))][0].charAt(0)
          ) +
            2
        ) {
          if (
            numbers.indexOf(playerHands[player][1].charAt(0)) + 2 >
            numbers.indexOf(
              playerHands[parseInt(hierarchy[i].charAt(1))][0].charAt(0) + 2
            )
          ) {
            // i remains the same
          } else if (
            numbers.indexOf(playerHands[player][1].charAt(0)) + 2 ==
            numbers.indexOf(
              playerHands[parseInt(hierarchy[i].charAt(1))][0].charAt(0) + 2
            )
          ) {
            // tie
            const newHierarchy = [
              ...hierarchy.slice(0, i),
              "tie_" + hierarchy[i] + "_p" + player.toString(),
              ...hierarchy.slice(i + 1),
            ];
            return [newHierarchy, handStrengths];
          } else if (
            numbers.indexOf(playerHands[player][1].charAt(0)) + 2 <
            numbers.indexOf(
              playerHands[parseInt(hierarchy[i].charAt(1))][0].charAt(0) + 2
            )
          ) {
            i++;
          }
        } else if (
          numbers.indexOf(playerHands[player][0].charAt(0)) + 2 <
          numbers.indexOf(
            playerHands[parseInt(hierarchy[i].charAt(1))][0].charAt(0)
          ) +
            2
        ) {
          i++;
        }
      }
    } else if (
      handStrength / 2 ==
      numbers.indexOf(playerHands[player][0].charAt(0)) + 2
    ) {
      // Pair
      if (
        handStrength / 2 ==
        numbers.indexOf(playerHands[player][1].charAt(0)) + 2
      ) {
        // tie
        const newHierarchy = [
          ...hierarchy.slice(0, i),
          "tie_" + hierarchy[i] + "_p" + player.toString(),
          ...hierarchy.slice(i + 1),
        ];
        return [newHierarchy, handStrengths];
      } else {
        // i remains the same
      }
    } else {
      // tie
      const newHierarchy = [
        ...hierarchy.slice(0, i),
        "tie_" + hierarchy[i] + "_p" + player.toString(),
        ...hierarchy.slice(i + 1),
      ];
      return [newHierarchy, handStrengths];
    }
  }

  const newHierarchy = [
    ...hierarchy.slice(0, i),
    "p" + player.toString(),
    ...hierarchy.slice(i),
  ];
  const newHandStrengths = [
    ...handStrengths.slice(0, i),
    handStrength,
    ...handStrengths.slice(i),
  ];

  return [newHierarchy, newHandStrengths];
}

function handStrength(playerHands, shownCards) {
  let strengthFound = false;
  let i = 0;
  let playerStrength, theNums, theSuits, arbStr, plaStr;

  [theNums, theSuits] = setHands(playerHands, shownCards);
  [arbStr, plaStr] = straightFlush(playerHands, shownCards);
  [arbStr1, plaStr1] = flush(playerHands, shownCards);

  var possibleHands = [
    royalFlush,
    fourOfAKind,
    fullHouse,
    flush,
    straight,
    threeOfAKind,
    twoPair,
    pair,
    highCard,
  ];

  while (strengthFound != false) {
    [strengthFound, playerStrength] = possibleHands[i](theNums, theSuits);
    if (i == 1 && arbStr) {
      strengthFound = arbStr;
      playerStrength = plaStr;
    } else if (i == 4 && arbStr1) {
      strengthFound = arbStr1;
      playerStrength = plaStr1;
    }
    i++;
  }

  return playerStrength;
}

// Organize loops
function setHands(playerHands, shownCards) {
  let returnNums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let returnSuits = [0, 0, 0, 0];

  // check shown hands
  for (let card = 0; card < shownCards.length; card++) {
    returnNums[numbers.indexOf(shownCards[card].charAt(0))]++;
    returnSuits[suits.indexOf(shownCards[card].charAt(2))]++;
  }

  // check player's hand
  for (let card = 0; card < playerHands.length; card++) {
    returnNums[numbers.indexOf(playerHands[card].charAt(0))]++;
    returnSuits[suits.indexOf(playerHands[card].charAt(2))]++;
  }

  return [returnNums, returnSuits];
}

// Royal Flush
function royalFlush(theNums, theSuits) {
  if (theSuits.includes(5)) {
    return [false, 0];
  }
  if (
    ((((theNums[12] == theNums[11]) == theNums[10]) == theNums[9]) ==
      theNums[8]) ==
    1
  ) {
    return [true, 10000000];
  }
  return [false, 0];
}

function straightFlush(hand, shown) {
  allcards = ["", "", "", "", "", "", ""];
  sortedcards = ["", "", "", "", "", "", ""];

  // get shown cards
  for (let i = 0; i < 5; i++) {
    allcards[i] = shown[i];
  }

  // get players cards
  for (let i = 0; i < 2; i++) {
    allcards[i + 5] = hand[i];
  }

  //sort cards
  for (let j = 0; j < sortedcards.length; j++) {
    min = numbers.indexOf(allcards[0].charAt(0)) + 2;
    indexOfMin = 0;

    for (let i = 0; i < allcards.length; i++) {
      //find smallest card
      if (min > numbers.indexOf(allcards[i].charAt(0)) + 2) {
        min = numbers.indexOf(allcards[i].charAt(0)) + 2;
        indexOfMin = i;
      }
    }
    sortedcards[j] = allcards[indexOfMin];
    allcards.splice(indexOfMin, 1);
  }

  //check for straight flush
  counter = 1;
  let highestCard;
  searching = true;
  for (var i = sortedcards.length - 1; i > 0; i--) {
    if (
      numbers.indexOf(sortedcards[i].charAt(0)) - 1 ==
        numbers.indexOf(sortedcards[i - 1].charAt(0)) &&
      sortedcards[i].charAt(2) == sortedcards[i - 1].charAt(2)
    ) {
      if (searching == true) {
        highestCard = numbers.indexOf(sortedcards[i].charAt(0)) + 2;
        searching = false;
      }
      counter++;
    } else {
      counter = 1;
      searching = true;
    }

    if (counter == 5) {
      return [true, 5 * highestCard - 10 + 1000000];
    }
  }
  return [false, NaN];
}

// Four of a kind
function fourOfAKind(theNums, theSuits) {
  if (theNums.includes(4)) {
    return [true, 150000 + theNums.indexOf(4) + 2];
  }

  return [false, 0];
}

// Full House
function fullHouse(theNums, theSuits) {
  if (theNums.includes(3) && theNums.includes(2)) {
    return [
      true,
      parseInt(theNums[theNums.indexOf(3)].toString() + "0000") +
        theNums[theNums.indexOf(2)],
    ];
  } else {
    return [false, 0];
  }
}

// Flush
function flush(hand, shown) {
  allcards = ["", "", "", "", "", "", ""];
  sortedcards = ["", "", "", "", "", "", ""];

  // get shown cards
  for (let i = 0; i < 5; i++) {
    allcards[i] = shown[i];
  }

  // get players cards
  for (let i = 0; i < 2; i++) {
    allcards[i + 5] = hand[i];
  }

  //sort cards
  for (let j = 0; j < sortedcards.length; j++) {
    min = numbers.indexOf(allcards[0].charAt(0)) + 2;
    indexOfMin = 0;

    for (let i = 0; i < allcards.length; i++) {
      //find smallest card
      if (min > numbers.indexOf(allcards[i].charAt(0)) + 2) {
        min = numbers.indexOf(allcards[i].charAt(0)) + 2;
        indexOfMin = i;
      }
    }
    sortedcards[j] = allcards[indexOfMin];
    allcards.splice(indexOfMin, 1);
  }

  //check for flush of a suit
  suitOfFlush = "";
  for (var i = 0; i < suits.length; i++) {
    counter = 0;
    for (var j = 0; j < sortedcards.length; j++) {
      if (sortedcards[j].charAt(2) == suits[i]) {
        counter++;
      }
    }
    if (counter >= 5) {
      suitOfFlush = suits[i];
      break;
    }
  }

  if (suitOfFlush == "") {
    return [false, NaN];
  }

  highestCards = ["", "", "", "", ""];
  counter = 0;
  for (var i = sortedcards.length - 1; i >= 0; i--) {
    if (sortedcards[i].charAt(2) == suitOfFlush) {
      highestCards[counter] = numbers.indexOf(sortedcards[i].charAt(0)) + 2;
      counter++;
    }

    if (counter == 5) {
      return [true, 60001 + Math.max(highestCards)];
    }
  }
}

function straight(nums) {
  counter = 0;
  let highestCard;
  searching = true;
  for (var i = nums.length - 1; i >= 0; i--) {
    if (nums[i] != 0) {
      if (searching == true) {
        highestCard = i + 2;
        searching = false;
      }
      counter++;
    } else {
      counter = 0;
      searching = true;
    }

    //check if straight
    if (counter == 5) {
      return [true, 1000 * (5 * highestCard - 10)];
    }
  }
  return [false, NaN];
}

// Three of a Kind
function threeOfAKind(playerHands, shownCards) {
  if (theNums.includes(3)) {
    return [true, 2700 + theNums.indexOf(3) + 2];
  }
  return [false, 0];
}

// Two Pair
function twoPair(nums) {
  counter = 0;
  pairs = [0, 0];
  for (var i = nums.length - 1; i >= 0; i--) {
    if (nums[i] == 2) {
      pairs[counter] = i + 2;
      counter++;
    }
    if (counter == 2) {
      return [true, 100 * (pairs[0] + pairs[1])];
    }
  }
  return [false, NaN];
}

// Pair
function pair(nums) {
  for (var i = nums.length - 1; i >= 0; i--) {
    if (nums[i] == 2) {
      return [true, 20 * (i + 2)];
    }
  }
  return [false, NaN];
}

// High Card
function highCard(playerHands, none) {
  for (let card = 12; card > 0; card--) {
    for (let hand = 0; hand < playerHands.length; hand++) {
      if (playerHands[hand].charAt(0) == numbers[card]) {
        return [true, card + 2];
      }
    }
  }
  return [false, 0];
}

function distributeWinnings() {
  winners = ["tie_p0_p1", "tie_p2_p3"];
  bets = ["90", "100", "110", "120"];
  balance = ["0", "0", "0", "0"];

  intbets = arrStrToInt(bets);
  intbalance = arrStrToInt(balance);

  //loop through each winner
  for (var i = 0; i < winners.length; i++) {
    temp = winners[i].split("_");
    playerNum = 0;
    payout = 0;

    //check for tie                 //["tie_p0_p1", p2, p3]
    if (temp[0] == "tie") {
      numTiedPlayers = temp.length - 1;
      tiedPlayerNums = [];
      tiedBets = [];

      for (var j = 0; j < numTiedPlayers; j++) {
        tiedPlayerNums[j] = parseInt(temp[j + 1][1]);
        tiedBets[j] = intbets[tiedPlayerNums[j]];
      }

      for (var j = 0; j < tiedBets.length; j++) {
        payout = 0;
        index = tiedBets.indexOf(Math.min(...tiedBets));
        currentBet = tiedBets[index];

        //subtract that bet from all players
        for (var k = 0; k < intbets.length; k++) {
          // check if bet is large enough
          if (intbets[k] - currentBet <= 0) {
            payout += intbets[k];
            intbets[k] = 0;
          } else {
            payout += currentBet;
            intbets[k] -= currentBet;
          }
        }
        //give even amount to tied winners
        for (var k = 0; k < tiedPlayerNums.length; k++) {
          intbalance[tiedPlayerNums[k]] += Math.floor(
            payout / tiedPlayerNums.length
          );
        }

        //reset arrays and stuff
        tiedPlayerNums.splice(index, 1);
        for (var k = 0; k < tiedBets.length; k++) {
          tiedBets[k] -= currentBet;
        }
        tiedBets[index] = 999999999999999;
      }
    } else {
      //check winners bet
      playerNum = parseInt(temp[0][1]);
      winnersBet = intbets[playerNum];

      //subtract that bet from all players
      for (var j = 0; j < intbets.length; j++) {
        // check if bet is large enough
        if (intbets[j] - winnersBet <= 0) {
          payout += intbets[j];
          intbets[j] = 0;
        } else {
          payout += winnersBet;
          intbets[j] -= winnersBet;
        }
      }

      //give amount to winner
      intbalance[playerNum] += payout;
    }
  }

  return arrIntToStr(intbalance);
}

function arrStrToInt(arr) {
  intArr = [];
  for (let i = 0; i < arr.length; i++) {
    intArr[i] = parseInt(arr[i]);
  }
  return intArr;
}

function arrIntToStr(arr) {
  strArr = [];
  for (let i = 0; i < arr.length; i++) {
    strArr[i] = arr[i].toString();
  }
  return strArr;
}
