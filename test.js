


function makelob(lob) {
  console.log(lob);
  let apiBase = 'http://ssh.jakeyee.com:9998/lob/';
  apiBase = apiBase + lob;

  let toSend = {
    id:lob,
    pnum:0
  };



  fetch(apiBase, { method: 'POST', body: JSON.stringify(toSend), mode:'no-cors'})
    .then(response => response.json())
    .then(toSend => console.log(toSend))
    .catch(error => {
      console.error ('Error:', error);
      console.log(toSend);
    });
    console.log("test");

}





function joinlob(lob) {
  console.log(lob);
  
  let apiBase = 'http://ssh.jakeyee.com:9998/lob/';
  apiBase = apiBase + lob;

  let toSend = {
    id:lob,
    pnum:0
  };



  fetch(apiBase, { method: 'PUT', body: JSON.stringify(toSend)})
    .then(response => response.json())
    .then(toSend => console.log(toSend))
    .catch(error => {
      console.error ('Error:', error);
      console.log(toSend);
    });

}



let pnumThing = -1;
let playernum = -1;
let totalplayers = -1;

function whoami(lob) {

  
  let apiBase = 'http://ssh.jakeyee.com:9998/lob/';
  apiBase = apiBase + lob;

  fetch(apiBase,{method: 'GET'})
  .then(response => {
    if (!response.ok) {
      console.log('R received:', response);
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Data received:', data);

    playernum = data.pnum


    
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });


}




function playernumbers(lob) {

  
  let apiBase = 'http://ssh.jakeyee.com:9998/lob/';
  apiBase = apiBase + lob;

  fetch(apiBase,{method: 'GET'})
  .then(response => {
    if (!response.ok) {
      console.log('R received:', response);
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Data received:', data);
    totalplayers = data.pnum;


    
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

}



function makebet(lob, player,bet, turn) {
  let apiBase = 'http://ssh.jakeyee.com:9998/bet/';
   apiBase = apiBase  + lob + '-' + player + '-'+ bet + '-' + turn;

  let toSend = {
    id:lob,
    pnum:player,
    num:bet,
    round:turn
  };


  fetch(apiBase, {headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }, method: 'POST', body: JSON.stringify(toSend), mode:'no-cors'})
    .then(response => response.json())
    .then(toSend => console.log(toSend))
    .catch(error => {
      console.error ('Error:', error);
      console.log(toSend);
    });
    console.log("test");


}





let num = -1;
let player = -1;
let round = -1;
function getbet(lob) {

  
  let apiBase = 'http://ssh.jakeyee.com:9998/bet/';
  apiBase = apiBase + lob;

  fetch(apiBase,{method: 'GET'})
  .then(response => {
    if (!response.ok) {
      console.log('R received:', response);
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Data received:', data);
    num = data.num
    player = data.pnum
    round = data.round
    
    
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

  console.log("dlkfjaslkdf",pnumThing);
}


function sendmsg(lob, player, msg) {
  let apiBase = 'http://ssh.jakeyee.com:9998/msg/';
  let msgtosend = "";
  msgtosend = msg.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(" ", "+");

  apiBase = apiBase  + lob + '-' + player + '-'+ msgtosend;

 let toSend = {
   id:lob,
   pnum:player,
   message:msgtosend,
 };


 fetch(apiBase, {headers: {
   'Accept': 'application/json',
   'Content-Type': 'application/json',
 }, method: 'POST', body: JSON.stringify(toSend), mode:'no-cors'})
   .then(response => response.json())
   .then(toSend => console.log(toSend))
   .catch(error => {
     console.error ('Error:', error);
     console.log(toSend);
   });
   console.log("test");

}



let pmsg = -1;
let msg = "";
function getmsg(lob) {

  
  let apiBase = 'http://ssh.jakeyee.com:9998/msg/';
  apiBase = apiBase + lob;

  fetch(apiBase,{method: 'GET'})
  .then(response => {
    if (!response.ok) {
      console.log('R received:', response);
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Data received:', data);
    pmsg = data.pnum;
    msg = data.message;
    
    
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

  console.log("dlkfjaslkdf",msg);
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


function checkmsg(lob) {
  let oldpmsg = pmsg;
  let oldmsg = msg;
  getmsg(lob);
  if (oldpmsg != pmsg || oldmsg != msg) {
    updatechat("p"+pmsg, message);
  }
  console.log("test");
  setTimeout(checkmsg, 4000);
}

function checkbet(lob) {
  let oldnum = num;
  let oldplayer = player;
  let oldround = round;
  getbet(lob);
  if (oldnum != num || oldplayer != player || oldround != round ) {

  }

  setTimeout(checkmsg(), 1000);

}



function updatechat(person, message) {
let color = "white";
  switch(person) {
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

var div = document.getElementById('chatbox');
div.innerHTML += '<p> <b style = "' + color + '">' + person + ':</b>' + message + '</p>';
}


function flipcard(cid, card) {
  document.getElementById(cid).src=card+".png";
}

function flipall(players) {
  for (var i = 0; i<players; i++) {
    var index = 5+2*playernum;
    var tempindex = 5+2*i;
    if (tempindex == index) {
      tempindex = 5+2*(i+1);
      if (tempindex > 12) {
        tempindex = tempindex -12 + 5;
      }
    }
    flipcard("o" + str(i) + "1", cards[tempindex-1]);
    flipcard ("o" + str(i) + "2", cards[tempindex]);
  }
}



function flipeverything(players, playernum) {
  flipcard("y1", cards[5+2*playernum-1]);
  flipcard ("y2", cards[5+2*playernum]);
}


// first5 is river, next 2 p1, p2, p3, p4
var cardarray = ['2_s', '3_s', '4_s', '5_s', '6_s', '7_s', '8_s', '9_s', 'x_s', 'j_s', 'q_s', 'k_s', 'a_s', '2_c', '3_c', '4_c', '5_c', '6_c', '7_c', '8_c', '9_c', 'x_c', 'j_c', 'q_c', 'k_c', 'a_c', '2_h', '3_h', '4_h', '5_h', '6_h', '7_h', '8_h', '9_h', 'x_h', 'j_h', 'q_h', 'k_h', 'a_h', '2_d', '3_d', '4_d', '5_d', '6_d', '7_d', '8_d', '9_d', 'x_d', 'j_d', 'q_d', 'k_d', 'a_d']
var cards = [];
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
    if (tempcards.includes(cardnum)){

    }
    else {
      tempcards.push(cardnum);
      z = z+1;
    }
    
  }

  for (var i = 0; i < 13; i++) {
    cards.push(cardarray[tempcards[i]])
  }

  flipcard("y1", "back");
  flipcard ("y2", "back");
  flipcard("o11", "back");
  flipcard ("o12", "back");
  flipcard("o21", "back");
  flipcard ("o22", "back");
  flipcard("o31", "back");
  flipcard ("o32", "back");
  flipcard("c1", "back");
  flipcard ("c2", "back");
  flipcard("c3", "back");
  flipcard ("c4", "back");
  flipcard ("c5", "back");

  console.log( cards);
}

function seededrand(seed) {
  var thing = seed;
    var x = Math.sin(thing++) * 10000;
    return Math.floor((x - Math.floor(x))*10000)%52;
}



