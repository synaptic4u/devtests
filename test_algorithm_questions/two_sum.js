/**
 * Find all the sets of two elements of an array that have the same sum as the number provided.
 */

const dataset = {
    'set' : new Set(),
    'searchTwoSum' : function(sum, sumset){
        
        for (const element of sumset) {

            let variance = sum - element;
            
            if( sumset.includes(variance) ){
                 
                this.set.add(element);
                this.set.add(variance);
            }
        }
        return this.set;
    }
};