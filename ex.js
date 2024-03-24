// global variables
var numPlayers = 4;
let round = 0;
var betAmount = [0, 0, 0, 0];
var playerFunds = [400, 400, 400, 400];
var seed = -1;
let num = -1;
let player = -1;
let roundThing = -1;
var lobbynum = -1;
var gameover = 0;

var suits = ["s", "c", "h", "d"];
var numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "x", "j", "q", "k", "a"];
var [shownCards, playerHands] = startgame(seed + game);

// const currentPlayer = () => {
//   return getbet1(seed) + 1;
// };

// // function to diable other but the player playing
// function disableMyself() {
//   if (currentPlayer == player) {
//     document.getElementById("check").diabled = true;
//     document.getElementById("call").diabled = true;
//     document.getElementById("raise").diabled = true;
//     document.getElementById("fold").diabled = true;
//   }
// }

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

function getbet1(lob) {
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
      return data.pnum;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  console.log("dlkfjaslkdf", pnumThing);
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
