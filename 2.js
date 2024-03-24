// Functions to determine Hand Hierarchy

// global variables
suits = ["s", "c", "h", "d"];
numbers = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "x",
  "j",
  "q",
  "k",
  "a",
];

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
  let playerStrength;

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
    [strengthFound, playerStrength] = possibleHands[i](playerHands, shownCards);
    i++;
  }

  return playerStrength;
}

// Royal Flush

function royalFlush(playerHands, shownCards) {
  royal = ["a", "x", "q", "j", "k"];
  matchingCards = [];

  // suits format: spades, clubs, hearts, diamond
  suitsMatched = [0, 0, 0, 0];

  // check shown cards
  for (let card = 0; card < shownCards.length; card++) {
    if (royal.includes(shownCards[card].charAt(0))) {
      matchingCards.push(shownCards[card]);
    }
  }

  // check player's hand
  for (let card = 0; card < playerHands.length; card++) {
    if (royal.includes(playerHands[card].charAt(0))) {
      matchingCards.push(playerHands[card]);
    }
  }

  if (matchingCards.length > 5) {
    for (let card = 0; card < matchingCards.length; card++) {
      for (let suit = 0; suit < suitsMatched.length; suit++) {
        if (matchingCards[card].charAt(2) == suits[suit]) {
          suitsMatched[suit]++;
          if (suitsMatched[suit] == 5) {
            return [true, 10000000];
          }
          break;
        }
      }
    }

    return [false, 0, suitsMatched, matchingCards];
  }
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
// '60001' -> if so high cards

function flush(playerHands, shownCards) {
  return [true, playerStrength];
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

function highCard(playerHands, shownCards) {
    for (let card = 0; card<numbers.length; card++ ) {
        for(let hand = 0; hand<playerHands.length;hand++) {
            if (playerHands[card])
        }
    }
  return [true, playerStrength];
}
