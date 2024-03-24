numbers = [1,1,0,1,0,1,0,0,0,0,1,1,2]; //2,3,4,5,6,7,8,9,x,j,q,k,a
theSuits = [1,2,3,1]; // s, c, h, d

a = twoPair(numbers);
console.log(a);


function straight(nums){
    counter = 0;
    highestCard;
    searching = true;
    for (var i = nums.length - 1; i >= 0; i--){
        if(counter == 5){
            return [true, 1000*(5*highestCard -10)];
        }

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