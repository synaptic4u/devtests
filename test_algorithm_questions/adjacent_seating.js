function seatingStudents(arr){
    
    const size = arr.shift(0);
    
    const leftRow = new Set();

    const searchSet = new Set(arr.values());
    
    let result = 0;
    
    for(let i = 1; i <= size; i += 2){
        
        leftRow.add(i);
    }

    for(const index of leftRow){

        // Checks parralel rows.
        if(!searchSet.has(index) && !searchSet.has(index + 1)){

            result++;
        }
        
        // Checks right column 
        if(!searchSet.has(index + 1) && !searchSet.has(index + 3) && (index + 1) <= 10 && (index + 1) % 2 === 0){

            result++;
        }
        
        // Checks left cvolumn
        if(!searchSet.has(index) && !searchSet.has(index+2) && index <= 9 && (index) % 2 === 1){

            result++;
        }
    }

    return "RESULT: " + result;
}

console.log([12, 1, 3, 6, 11]);
console.log("EXPECTED: " + 7);
console.log(seatingStudents([12, 1, 3, 6, 11]));
/**
 * ** * ** *
 *  1 *  2 * 1  2&4
 *  3 *  4 * 3  
 *  5 *  6 * 6  5&7
 *  7 *  8 *    7&8 8&10 7&9
 *  9 * 10 *    9&10 10&12
 * 11 * 12 * 11
 * * * * * *
 */

console.log([12, 2,4,7,12]);
console.log("EXPECTED: " + 7);
console.log(seatingStudents([12, 2,4,7,12]));
/**
 * ** * ** *
 *  1 *  2 * 2  1&3
 *  3 *  4 * 4  3&5
 *  5 *  6 *    5&6 6&8
 *  7 *  8 * 7  8&10 
 *  9 * 10 *    9&10 9&11
 * 11 * 12 * 12
 * * * * * *
 */

/**
 * ** * ** *
 *  1 *  2 *    1&2 2&4
 *  3 *  4 * 3  4&6
 *  5 *  6 * 5  
 *  7 *  8 * 8  7&9
 *  9 * 10 *    9&10 9&11 10&12
 * 11 * 12 *    11&12
 * * * * * *
 */