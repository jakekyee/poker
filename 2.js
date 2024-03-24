// Functions to determine Hand Hierarchy

// global variables
suits = ["s", "c", "h", "d"];
numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "x", "j", "q", "k", "a"];
playerHands = ["5_s", "2_c"];
shownCards = ["a_s", "2_d", "4_c", "4_h", "5_d"];

// cards are formatted as (number)_(suit)

// handHierarchy function
function handHierarchy(shownCards, hands, playerCount) {
  const hierarchy = {};
  const handStrengths = {};
  let strength, tieBreaker;

  for (let player = 0; player < playerCount; player++) {
    [strength, tieBreaker] = handStrength(hands[player], shownCards);
    [hierarchy, handStrengths] = addPlayer(
      "p" + player.toString(),
      strength,
      handStrengths,
      hierarchy,
      tieBreaker
    );
  }

  return hierarchy;
}

// addPlayer function
function addPlayer(player, handStrength, handStrengths, hierarchy, tieBreaker) {
  let i = 0;
  while (handStrength < handStrengths[i] && handStrength != handStrengths[i]) {
    i++;
  }
  if (handStrength == handStrengths[i]) {
    //
  }

  const newHierarchy = [
    ...hierarchy.slice(0, i),
    player,
    ...hierarchy.slice(i),
  ];
  const newHandStrengths = [
    ...handStrengths.slice(0, i),
    handStrength,
    ...handStrengths.slice(i),
  ];

  return [newHierarchy, newHandStrengths];
}

console.log(addPlayer("p1", 10, [10, 8, 7], ["p0", "p2", "p3"]));

function handStrength(playerHands, shownCards) {
  let strengthFound = false;
  let i = 0;
  let playerStrength, theNums, theSuits, arbStr, plaStr, tieBreaker;

  [theNums, theSuits] = setHands(playerHands, shownCards);
  [arbStr, plaStr, arbTie] = straightFlush(playerHands, shownCards);

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
    [strengthFound, playerStrength, tieBreaker] = possibleHands[i](
      theNums,
      theSuits
    );
    if (i == 1 && arbStr) {
      strengthFound = arbStr;
      playerStrength = plaStr;
      tieBreaker = arbTie;
    }
    i++;
  }

  return [playerStrength, tieBreaker];
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
    return [false, 0, NaN];
  }
  if (
    ((((theNums[12] == theNums[11]) == theNums[10]) == theNums[9]) ==
      theNums[8]) ==
    1
  ) {
    return [true, 10000000, NaN];
  }
  return [false, 0, NaN];
}

// Straight Flush
function straightFlush(playerHands, shownCards) {
  return [false, NaN, NaN];
}

// Four of a kind
function fourOfAKind(theNums, theSuits) {
  if (theNums.includes(4)) {
    return [true, 150000 + theNums.indexOf(4) + 2, NaN];
  }

  return [false, 0, NaN];
}

// Full House
function fullHouse(theNums, theSuits) {
  if (theNums.includes(3) && theNums.includes(2)) {
    return [
      true,
      parseInt(theNums[theNums.indexOf(3)].toString() + "0000") +
        theNums[theNums.indexOf(2)],
      ,
      NaN,
    ];
  } else {
    return [false, 0, NaN];
  }
}

// Flush
function flush(theNums, theSuits) {
  if (theSuits.includes(5)) {
    return [true, 60001 + theNums.indexOf(5) + 2, theNums];
  }
  return [false, 0, NaN];
}

// Straight
function straight(nums) {
  counter = 0;
  highestCard;
  searching = true;
  for (var i = nums.length - 1; i >= 0; i--) {
    if (counter == 5) {
      return [true, 1000 * (5 * highestCard - 10), NaN];
    }

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
  }
  return [false, NaN, NaN];
}

// Three of a Kind
function threeOfAKind(playerHands, shownCards) {
  if (theNums.includes(3)) {
    return [true, 2700 + theNums.indexOf(3) + 2, NaN];
  }
  return [false, 0, NaN];
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
      return [true, 100 * (pairs[0] + pairs[1]), nums];
    }
  }
  return [false, NaN, NaN];
}

// Pair
function pair(nums) {
  for (var i = nums.length - 1; i >= 0; i--) {
    if (nums[i] == 2) {
      return [true, 20 * (i + 2), nums];
    }
  }
  return [false, NaN, NaN];
}

// High Card
function highCard(playerHands) {
  for (let card = 12; card > 0; card--) {
    for (let hand = 0; hand < playerHands.length; hand++) {
      if (playerHands[hand].charAt(0) == numbers[card]) {
        return [true, card + 2, NaN];
      }
    }
  }
  return [true, playerStrength, NaN];
}
