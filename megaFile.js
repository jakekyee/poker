


suits = ["s", "c", "h", "d"];
numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "x", "j", "q", "k", "a"];
numbers_ = [0,0,1,1,1,2,1,0,0,0,0,0,1]; //2,3,4,5,6,7,8,9,x,j,q,k,a
theSuits = [1,2,3,1]; // s, c, h, d
playerHands = ["7_c", "3_c"];
shownCards = ["a_c", "x_c", "j_d", "q_s", "k_s"];

a = flush(playerHands, shownCards);
console.log(a);

//check straight flush
//set hands
//check everything else

function straightFlush(hand, shown){
    allcards = ["","","","","","",""];
    sortedcards = ["","","","","","",""];

    // get shown cards
    for (let i = 0; i < 5; i++) {
        allcards[i] = shown[i];
    }

    // get players cards
    for (let i = 0; i < 2; i++) {
        allcards[i+5] = hand[i];
    }

    //sort cards
    for (let j = 0; j < sortedcards.length; j++){

        min = numbers.indexOf(allcards[0].charAt(0)) + 2;
        indexOfMin = 0;

        for (let i = 0; i < allcards.length; i++){
            //find smallest card
            if(min > numbers.indexOf(allcards[i].charAt(0)) + 2){
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
    for (var i = sortedcards.length - 1; i > 0; i--){

        if(numbers.indexOf(sortedcards[i].charAt(0)) - 1 == numbers.indexOf(sortedcards[i-1].charAt(0)) && sortedcards[i].charAt(2) == sortedcards[i-1].charAt(2)){
            if(searching == true){
                highestCard = numbers.indexOf(sortedcards[i].charAt(0)) + 2;
                searching = false;
            }
            counter++;
        }
        else{
            counter = 1;
            searching = true;
        }

        if(counter == 5){
            return [true, (5*highestCard -10 +1000000)];
        }
    }
    return [false, NaN];
}

function flush(hand, shown){
    allcards = ["","","","","","",""];
    sortedcards = ["","","","","","",""];

    // get shown cards
    for (let i = 0; i < 5; i++) {
        allcards[i] = shown[i];
    }

    // get players cards
    for (let i = 0; i < 2; i++) {
        allcards[i+5] = hand[i];
    }

    //sort cards
    for (let j = 0; j < sortedcards.length; j++){

        min = numbers.indexOf(allcards[0].charAt(0)) + 2;
        indexOfMin = 0;

        for (let i = 0; i < allcards.length; i++){
            //find smallest card
            if(min > numbers.indexOf(allcards[i].charAt(0)) + 2){
                min = numbers.indexOf(allcards[i].charAt(0)) + 2;
                indexOfMin = i;
            }
        }
        sortedcards[j] = allcards[indexOfMin];
        allcards.splice(indexOfMin, 1);
    }

    //check for flush of a suit
    suitOfFlush = "";
    for (var i = 0; i < suits.length; i++){
        counter = 0;
        for (var j = 0; j < sortedcards.length; j++){
            if(sortedcards[j].charAt(2) == suits[i]){
                counter++;
            }
        }
        if(counter >= 5){
            suitOfFlush = suits[i];
            break;
        }
    }

    if(suitOfFlush == ""){
        return [false, NaN, NaN];
    }

    highestCards = ["","","","",""];
    counter = 0;
    for (var i = sortedcards.length - 1; i >= 0; i--){
        if(sortedcards[i].charAt(2) == suitOfFlush){
            highestCards[counter] = numbers.indexOf(sortedcards[i].charAt(0)) + 2;
            counter++;
        }

        if(counter == 5){
            return [true, highestCards, NaN];
        }
    }

    



}

function straight(nums){
    counter = 0;
    let highestCard;
    searching = true;
    for (var i = nums.length - 1; i >= 0; i--){
        if(nums[i] != 0){
            if(searching == true){
                highestCard = (i+2);
                searching = false;
            }
            counter++;
        }
        else{
            counter = 0;
            searching = true;
        }

        //check if straight
        if(counter == 5){
            return [true, 1000*(5*highestCard -10)];
        }
    }
    return [false, NaN];
}

function twoPair(nums){
    counter = 0;
    pairs = [0,0];
    for (var i = nums.length - 1; i >= 0; i--){
        if(nums[i] == 2){
            pairs[counter] = (i+2);
            counter++;
        }
        if(counter == 2){
            return [true, 100*(pairs[0]+pairs[1]), nums];
        }
    }
    return [false, NaN, NaN];
}

function pair(nums){
    for (var i = nums.length - 1; i >= 0; i--){
        if(nums[i] == 2){
            return [true, 20*(i+2), nums];
        }
    }
    return [false, NaN, NaN];
}