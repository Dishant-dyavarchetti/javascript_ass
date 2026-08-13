let max = 0;
numbers = [10,20,30,40,50, 60, 20];

// maximum
numbers.forEach(element => {
    if(element > max){
        max = element;
    }
});

console.log(`Maximum ${max}`);

// minimum
let min = Infinity;
numbers.forEach(element => {
    if(min > element){
        min = element;
    }
});

console.log(`minimum ${min}`);

// average
function avg(numbers){
    let len = numbers.length;
    let sum = 0;
    numbers.forEach(element => {
        sum += element;
    })
    return sum / len;
    
}

console.log(`Average of list ${avg(numbers)}`);

// median
function median(numbers){
    let obs;
    let len = numbers.length;
    let sorted = [...numbers].sort((a,b) => {
        return a - b;
    })
    if(len % 2 == 1){
        obs = (len - 1) / 2;
        return sorted[obs];
    }

    if(len % 2 == 0){
        let obs1 = (len / 2) - 1;
        let obs2 = (len / 2) ;
        let med = (sorted[obs1] + sorted[obs2]) / 2;
        return med;

    }
    
}

console.log(`Median of the list ${median(numbers)}`);

// mode

function mode(numbers){
    let frequency = {};
    numbers.forEach(ele => {
        if(frequency[ele]){
            frequency[ele]++;
        }else{
            frequency[ele] = 1;
        }
    });
    let max_freq = 0;
    let mode = 0;
    for(key in frequency){
        if(frequency[key] > max_freq){
            max_freq = frequency[key];
            mode = Number(key);
        }
    }
    return mode;
}

console.log(`Mode for the given number list: ${mode(numbers)}`);
