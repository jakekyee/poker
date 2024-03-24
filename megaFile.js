numbers = [2,1,0,1,0,1,0,1,1,0,1,0,0]; //2,3,4,5,6,7,8,9,x,j,q,k,a
theSuits = [1,2,3,1]; // s, c, h, d

a = pair(numbers, theSuits);
console.log(a);

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