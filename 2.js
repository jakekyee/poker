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
        playerHands[parseInt(hierarchy[i].charAt(1))][0].charAt(0)
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
console.log(addPlayer(1, 2666, [2666, 12], ["p0", "p3"]));

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
