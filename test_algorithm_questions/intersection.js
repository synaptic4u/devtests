//At the moment; Word is that using a constant object instead of nested or multiple functions and variables, the constant with properties and methods is quicker and reduces stack overload for the JS engine. Making it marginally more efficient.

const intersection = {
  'result': new Set(),
  'find': function(args){

    //Create sets taking each element of the array which is a string and then split the string into an array which is passed to the Set constrictor elemanating duplicate numbers and white space.
    let setA = new Set((args[0]).split(","));
    let setB = new Set((args[1]).split(","));

    console.log(setA);
    console.log(setB);

     //Parses one set using the contains method of the other set.
    foreach(const element of setA){
      if(setA.contains(element)){
        this.result.push(element);
      }
    }

    console.log(this.result);

    return this.result;
  }  
};