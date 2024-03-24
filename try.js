// global variables
var numPlayers = 4;
let round = 0;
var betAmount = [0, 0, 0, 0];
var playerFunds = [400, 400, 400, 400];
var game = 1;
var seed = -1;
let num = -1;
let player = -1;
let roundThing = -1;
var lobbynum = -1;
var gameover = 0;

var suits = ["s", "c", "h", "d"];
var numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "x", "j", "q", "k", "a"];
var [shownCards, playerHands] = startgame(seed + game);

// global variables
// Functions to determine betting operations

let pmsg = -1;
let msg = "";

let pnumThing = -1;
let playernum = -1;
let totalplayers = -1;

document.addEventListener("keypress", function (event) {
  if (event.keyCode == 13) {
    sendmsg(
      document.getElementById("uname").value,
      document.getElementById("mbox").value
    );
    document.getElementById("mbox").value = "";
  }
});

var usernamething = "1";
function makelob(lob) {
  usernamething = document.getElementById("uname").value;
  lobbynum = lob;
  console.log(lob);
  let apiBase = "http://ssh.jakeyee.com:9998/lob/";
  apiBase = apiBase + lob;

  let toSend = {
    id: lob,
    pnum: 0,
  };

  fetch(apiBase, {
    method: "POST",
    body: JSON.stringify(toSend),
    mode: "no-cors",
  })
    .then((response) => response.json())
    .then((toSend) => console.log(toSend))
    .catch((error) => {
      console.error("Error:", error);
      console.log(toSend);
    });
  console.log("test");

  seed = lob;
  // checkbet(lob);
  checkmsg(lob);
  starteverything();
}

function joinlob(lob) {
  usernamething = document.getElementById("uname").value;

  console.log(lob);

  let apiBase = "http://ssh.jakeyee.com:9998/lob/";
  apiBase = apiBase + lob;

  let toSend = {
    id: lob,
    pnum: 0,
  };

  fetch(apiBase, { method: "PUT", body: JSON.stringify(toSend) })
    .then((response) => response.json())
    .then((toSend) => console.log(toSend))
    .catch((error) => {
      console.error("Error:", error);
      console.log(toSend);
    });
  seed = lob;
  // checkbet(lob);
  checkmsg(lob);
  starteverything();
}

function whoami(lob) {
  let apiBase = "http://ssh.jakeyee.com:9998/lob/";
  apiBase = apiBase + lob;

  fetch(apiBase, { method: "GET" })
    .then((response) => {
      if (!response.ok) {
        console.log("R received:", response);
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data received:", data);

      playernum = data.pnum;
      document.getElementById["player"].innerText = playernum;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function playernumbers(lob) {
  let apiBase = "http://ssh.jakeyee.com:9998/lob/";
  apiBase = apiBase + lob;

  fetch(apiBase, { method: "GET" })
    .then((response) => {
      if (!response.ok) {
        console.log("R received:", response);
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data received:", data);
      totalplayers = data.pnum;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function makebet(lob, player, bet, turn) {
  let apiBase = "http://ssh.jakeyee.com:9998/bet/";
  apiBase = apiBase + lob + "-" + player + "-" + bet + "-" + turn;

  let toSend = {
    id: lob,
    pnum: player,
    num: bet,
    round: turn,
  };

  fetch(apiBase, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(toSend),
    mode: "no-cors",
  })
    .then((response) => response.json())
    .then((toSend) => console.log(toSend))
    .catch((error) => {
      console.error("Error:", error);
      console.log(toSend);
    });
  console.log("test");
}

function getbet(lob) {
  let apiBase = "http://ssh.jakeyee.com:9998/bet/";
  apiBase = apiBase + lob;

  fetch(apiBase, { method: "GET" })
    .then((response) => {
      if (!response.ok) {
        console.log("R received:", response);
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data received:", data);
      num = data.num;
      player = data.pnum;
      roundThing = data.round;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  console.log("dlkfjaslkdf", pnumThing);
}

function sendmsg(player, msg, lob = seed) {
  let apiBase = "http://ssh.jakeyee.com:9998/msg/";
  let msgtosend = "";
  msgtosend = msg.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(" ", "+");

  apiBase = apiBase + lob + "-" + player + "-" + msgtosend;

  let toSend = {
    id: lob,
    pnum: player,
    message: msgtosend,
  };

  fetch(apiBase, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(toSend),
    mode: "no-cors",
  })
    .then((response) => response.json())
    .then((toSend) => console.log(toSend))
    .catch((error) => {
      console.error("Error:", error);
      console.log(toSend);
    });
  console.log("test");
}

function getmsg(lob) {
  let apiBase = "http://ssh.jakeyee.com:9998/msg/";
  apiBase = apiBase + lob;

  fetch(apiBase, { method: "GET" })
    .then((response) => {
      if (!response.ok) {
        console.log("R received:", response);
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data received:", data);
      pmsg = data.pnum;
      if (msg != data.message) {
        msg = data.message;
        updatechat(pmsg, msg);
      }
      msg = data.message;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  console.log("dlkfjaslkdf", msg);
}

function checkpcount(lob) {
  let oldtotalplayers = totalplayers;

  let offset = playernum - 1;

  playernumbers(lob);

  if (oldtotalplayers != totalplayers) {
    flipall(totalplayers, offset);
  }
  if (started == 0) {
    setTimeout(checkmsg(), 1000);
  }
}

function checkmsg() {
  console.log(seed);
  let oldpmsg = pmsg;
  let oldmsg = msg;
  getmsg(seed);
  console.log(oldmsg, msg);
  if (oldmsg != msg) {
    // updatechat(pmsg, msg);
  }
  // updatechat(pmsg, message);
  // updatechat(pmsg, msg);

  console.log("test");
  setTimeout(checkmsg, 1000);
}

function checkbet() {
  console.log(seed);
  let oldnum = num;
  let oldplayer = player;
  let oldround = roundThing;
  getbet(seed);
  if (oldnum != num || oldplayer != player || oldround != roundThing) {
    if (oldround == roundThing) {
      if (oldnum == num) {
        call(player);
        sendmsg(seed, "SYSTEM:", player + "HAS CALLED!");
      } else if (num == -1) {
        fold(player);
        sendmsg(seed, "SYSTEM:", player + "HAS FOLDED!");
      } else {
        raise(num, player);
        sendmsg(seed, "SYSTEM:", player + "HAS RAISED!");
      }
    }
  }

  setTimeout(checkbet, 4000);
}

function updatechat(person, message) {
  let color = "white";
  switch (person) {
    case "p1":
      color = "red";
      break;
    case "p2":
      color = "lightblue";
      break;
    case "p3":
      color = "orange";
      break;
    case "p4":
      color = "lightpurple";
      break;
    default:
      color = "lightgreen";
  }

  var div = document.getElementById("chatbox");
  div.innerHTML +=
    '<p> <b style = "' + color + '">' + person + ":</b>" + message + "</p>";
}

function flipcard(cid, card) {
  document.getElementById(cid).src = card + ".png";
}

function flipall(players) {
  for (var i = 0; i < players; i++) {
    var index = 5 + 2 * playernum;
    var tempindex = 5 + 2 * i;
    if (tempindex == index) {
      tempindex = 5 + 2 * (i + 1);
      if (tempindex > 12) {
        tempindex = tempindex - 12 + 5;
      }
    }
    flipcard("o" + str(i) + "1", cards[tempindex - 1]);
    flipcard("o" + str(i) + "2", cards[tempindex]);
  }
}

function flipeverything(players, playernum) {
  flipcard("y1", cards[5 + 2 * playernum - 1]);
  flipcard("y2", cards[5 + 2 * playernum]);
}

// first5 is river, next 2 p1, p2, p3, p4
var cardarray = [
  "2_s",
  "3_s",
  "4_s",
  "5_s",
  "6_s",
  "7_s",
  "8_s",
  "9_s",
  "x_s",
  "j_s",
  "q_s",
  "k_s",
  "a_s",
  "2_c",
  "3_c",
  "4_c",
  "5_c",
  "6_c",
  "7_c",
  "8_c",
  "9_c",
  "x_c",
  "j_c",
  "q_c",
  "k_c",
  "a_c",
  "2_h",
  "3_h",
  "4_h",
  "5_h",
  "6_h",
  "7_h",
  "8_h",
  "9_h",
  "x_h",
  "j_h",
  "q_h",
  "k_h",
  "a_h",
  "2_d",
  "3_d",
  "4_d",
  "5_d",
  "6_d",
  "7_d",
  "8_d",
  "9_d",
  "x_d",
  "j_d",
  "q_d",
  "k_d",
  "a_d",
];
var cards = [];
var rivercards = [];
var tempcards = [];

function startgame(seed) {
  cards = [];
  tempcards = [];
  var temp = seed;
  var cardnum = -1;
  var z = 0;
  while (z < 14) {
    temp = temp + 1;
    cardnum = seededrand(temp);
    if (tempcards.includes(cardnum)) {
    } else {
      tempcards.push(cardnum);
      z = z + 1;
    }
  }

  for (var i = 0; i < 13; i++) {
    cards.push(cardarray[tempcards[i]]);
  }

  flipcard("y1", "back");
  flipcard("y2", "back");
  flipcard("o11", "back");
  flipcard("o12", "back");
  flipcard("o21", "back");
  flipcard("o22", "back");
  flipcard("o31", "back");
  flipcard("o32", "back");
  flipcard("c1", "back");
  flipcard("c2", "back");
  flipcard("c3", "back");
  flipcard("c4", "back");
  flipcard("c5", "back");

  console.log(cards);
  return [
    cards.slice(0, 5),
    [
      cards.slice(5, 7),
      cards.slice(7, 9),
      cards.slice(9, 11),
      cards.slice(11, 13),
    ],
  ];
}

function seededrand(seed) {
  var thing = seed;
  var x = Math.sin(thing++) * 10000;
  return Math.floor((x - Math.floor(x)) * 10000) % 52;
}

function raise(bet, playerIndex = playernum) {
  betAmount[playerIndex] += bet;
  playerFunds[playerIndex] -= bet;
  // bigPot[0] += raise;

  if (checkRoundOver(betAmount, playerIndex)) {
    round++;
    makebet(seed, playerIndex, bet, round);
    if (checkGameOver()) {
      // Game is over
    }
  }
  return [playerFunds, betAmount, bigPot, round];
}

function fold(playerIndex = playernum) {
  // remove folded player from array for checking
  // returns -1 if player folds
  betAmount[playerIndex] = -1;
  makebet(seed, playerIndex, betAmount[playerIndex], round);

  if (checkRoundOver(betAmount, playerIndex)) {
    round++;
  }
  if (checkGameOver()) {
    // Game is over
  }
  return [betAmount, round];
}

function call(playerIndex = playernum) {
  let numPlayers = totalplayers;

  temp = betAmount[playerIndex];
  playerIndex = playerIndex % numPlayers;
  let prevPlayerIndex = (playerIndex - 1) % numPlayers;
  // increase bet amount to the previous players bet amount
  betAmount[playerIndex] = betAmount[prevPlayerIndex];

  // player funds subtracted by difference between new bet amount and old bet amount
  difference = betAmount[playerIndex] - temp;
  console.log("difference ", difference);
  playerFunds[playerIndex] -= difference;
  bigPot[0] += difference;

  if (checkRoundOver(betAmount, playerIndex)) {
    round++;
    makebet(seed, playerIndex, betAmount[playerIndex], round);
  }
  if (checkGameOver()) {
    // Game is over
    gameover = 1;
  }
  return [playerFunds, bigPot, betAmount, round];
}

function check(playerIndex = playerNum) {
  // pass
  if (checkRoundOver(betAmount, playerIndex)) {
    round++;
    return [round];
  }
  if (checkGameOver()) {
    // Game is over
  }
}

function checkRoundOver(betAmount) {
  //
  let firstPositiveValue = -1; // Initialize with an invalid value
  for (let i = 0; i < betAmount.length; i++) {
    if (betAmount[i] != -1) {
      firstPositiveValue = betAmount[i];
      break;
    }
  }

  if (firstPositiveValue == -1) {
    // If there are no positive values in the array, return true
    playerFunds = distributeWinnings(
      handHierarchy(shownCards, playerHands, numPlayers),
      betAmount,
      playerFunds
    );

    return true;
  }

  for (let i = 0; i < betAmount.length; i++) {
    if (betAmount[i] != -1 && betAmount[i] != firstPositiveValue) {
      return false; // If any non-negative value is different, return false
    }
  }

  if (round == 0) {
    flipcard("c1", cards[0]);
    flipcard("c2", cards[1]);
    flipcard("c3", cards[2]);
  } else if (round == 1) {
    flipcard("c4", cards[3]);
  } else if (round == 2) {
    flipcard("c5", cards[4]);
  }

  return true; // All non-negative values are the same
}

function checkGameOver() {
  if (round == 4) {
    playerFunds = distributeWinnings(
      handHierarchy(shownCards, playerHands, numPlayers),
      betAmount,
      playerFunds
    );
    gameover = 1;
    game++;
    return true;
  } else {
    return false;
  }
}

// Functions to determine Hand Hierarchy

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

// Functions to determine winning conditions

// distribute winnings
function distributeWinnings(winners, bets, balance) {
  //winners = ["tie_p0_p1", "tie_p2_p3"]; or ["p0","p1","p2","p3"]
  //bets = ["90", "100", "110", "120"];
  //balance = ["0", "0", "0", "0"];

  intbets = arrStrToInt(bets);
  intbalance = arrStrToInt(balance);

  //loop through each winner
  for (var i = 0; i < winners.length; i++) {
    temp = winners[i].split("_");
    playerNum = 0;
    payout = 0;

    //check for tie
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

  return intbalance;
}

// str array to int array
function arrStrToInt(arr) {
  intArr = [];
  for (let i = 0; i < arr.length; i++) {
    intArr[i] = parseInt(arr[i]);
  }
  return intArr;
}

// int array to str array
function arrIntToStr(arr) {
  strArr = [];
  for (let i = 0; i < arr.length; i++) {
    strArr[i] = arr[i].toString();
  }
  return strArr;
}
