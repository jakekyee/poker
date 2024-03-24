// Functions to determine Hand Hierarchy

// global variables
suits = ["s", "c", "h", "d"];
numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "x", "j", "q", "k", "a"];
playerHands = ["5_s", "2_c"];
shownCards = ["2_s", "2_d", "4_c", "4_h", "5_d"];

// cards are formatted as (number)_(suit)

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
function addPlayer(player, handStrengh, handStrengths, hierarchy) {
  return [hierarchy, handStrengths];
}

function handStrength(playerHands, shownCards) {
  let strengthFound = false;
  let i = 0;
  let playerStrength, theNums, theSuits;

  [theNums, theSuits] = setHands(playerHands, shownCards);

  var possibleHands = [
    royalFlush,
    straightFlush,
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

  return [[returnNums], [returnSuits]];
}

// Royal Flush

function royalFlush(theNums, theSuits) {
  if (!theSuits.includes(5)) {
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

// Straight Flush
// 1000000+a+b+c+d+e
//     1000015-1000060

function straightFlush(playerHands, shownCards) {
  return [true, playerStrength];
}

// Four of a kind
// 150000+a
//     150001-150014

function fourOfAKind(playerHands, shownCards) {
  let numbers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  return [true, playerStrength];
}

// Full House
// No ties-> three of kind
// (3 cards = a, 2 cards = b)
// 'a'+'0000'+b
//     100002-140013

function fullHouse(playerHands, shownCards) {
  return [true, playerStrength];
}

// Flush
function flush(theNums, theSuits) {
  if (theSuits.includes(5)) {
    return [true, 0];
  }
  return [true, 60001, theNums];
}

// Straight
// a+b+c+d+e+'000'
//     15000-60000

function straight(playerHands, shownCards) {
  return [true, playerStrength];
}

// Three of a Kind
// 2700+a
//     2701-2804

function threeOfAKind(playerHands, shownCards) {
  return [true, playerStrength];
}

// Two Pair
// a+b+'00'
//     300-2700

function twoPair(playerHands, shownCards) {
  // use pair function
  return [true, playerStrength];
}

// Pair
// a+a+'0'
//     20-280

function pair(playerHands, shownCards) {
  return [true, playerStrength];
}

// High Card
// a
//     1-14

function highCard(playerHands) {
  for (let card = 12; card > 0; card--) {
    for (let hand = 0; hand < playerHands.length; hand++) {
      if (playerHands[hand].charAt(0) == numbers[card]) {
        return [true, card + 2];
      }
    }
  }
  return [true, playerStrength];
}
