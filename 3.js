



function distributeWinnings() {

    winners = ["tie_p0_p1","tie_p2_p3"];
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
        if(temp[0] == "tie"){
            numTiedPlayers = temp.length-1;
            tiedPlayerNums = [];
            tiedBets = [];
            
        
            for(var j = 0; j < numTiedPlayers; j++){
                tiedPlayerNums[j]  = parseInt(temp[j+1][1]);
                tiedBets[j] = intbets[tiedPlayerNums[j]];
            }

            for(var j = 0; j < tiedBets.length; j++){
                payout = 0;
                index = tiedBets.indexOf(Math.min(...tiedBets));
                currentBet = tiedBets[index];

                //subtract that bet from all players
                for(var k = 0; k < intbets.length; k++){
                    // check if bet is large enough
                    if(intbets[k] - currentBet <= 0){
                        payout += intbets[k];
                        intbets[k] = 0;
                    }
                    else{
                        payout += currentBet;
                        intbets[k] -= currentBet;
                    }
                }
                //give even amount to tied winners
                for(var k = 0; k < tiedPlayerNums.length; k++){
                    intbalance[tiedPlayerNums[k]] += Math.floor(payout/tiedPlayerNums.length);
                }

                //reset arrays and stuff
                tiedPlayerNums.splice(index, 1);
                for(var k = 0; k < tiedBets.length; k++){
                    tiedBets[k] -= currentBet;
                }
                tiedBets[index] = 999999999999999;
            }
            
        }
        else{
            //check winners bet
            playerNum = parseInt(temp[0][1]);
            winnersBet = intbets[playerNum];

            //subtract that bet from all players
            for(var j = 0; j < intbets.length; j++){
                // check if bet is large enough
                if(intbets[j] - winnersBet <= 0){
                    payout += intbets[j];
                    intbets[j] = 0;
                }
                else{
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

function arrStrToInt(arr){
    intArr = [];
    for(let i = 0; i < arr.length; i++){
        intArr[i] = parseInt(arr[i]);
    }
    return intArr;
}

function arrIntToStr(arr){
    strArr = [];
    for(let i = 0; i < arr.length; i++){
        strArr[i] = arr[i].toString();
    }
    return strArr;
}