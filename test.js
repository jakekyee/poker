


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
  
  playernumbers(lob);
  if (oldtotalplayers != totalplayers) {
    if (totalplayers != )
    totalplayers 

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
  setTimeout(checkmsg(), 1000);
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


