import { FormParser } from "../FormParser/FormParser.js";
import { Response } from "../Response/Response.js";
import { Validate } from "../Validate/Validate.js";
import { Customer } from "../Customer/Customer.js";

/**
 * Object Search provides functionality to search the customers array with a name or age group query.
 */
const Search = {
    'response': Response,
    'dataArray': [],
    /** * Rebuilds the Customers array by calculating the age and adding it to each object in the array.

     * Filters the local data array for a object by name.
     * @param {String} query 
     */
    'filterByName': function( query) {
                
        this.dataArray = this.dataArray.filter(data => 
      
            data.name.toLowerCase().includes(query.toLowerCase())
        );       
    },
    /**
     * Filters the local dataArray for the age range, works off previously calculated age
     * @param {String``} ageRange 
     */
    'filterByAgeRange': function(ageRange) {

        let [minAge, maxAge] = ageRange.split('-').map(Number);
        
        this.dataArray = this.dataArray.filter(data =>
        
            data.age >= minAge && data.age <= maxAge
        );
    },
    /**
     * Calculates the birthday to age based upon the current date
     * @param {Date String} ageDate 
     * @returns 
     */
    'calcAge': function(ageDate){

        let birthDate = new Date(ageDate);
        let today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        
        let monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        
            age--;
        }

        return age;
    },
    /**
     * Parses the global variable array customers to calculate each customers age and add it to the local dataArray.
     */
    'addAgeToCustomers': function(){

        // Toggle to see that if customers array is not found then return error.
        // let customers = []; 
        
        this.dataArray = customers.map(customer => ({
            ...customer,
            age: this.calcAge(customer.birthdate)
        }));
    },
    /**
     * Searches the customer data for the parsed form search values.
     * @param {FormObject} request 
     * @returns Response
     */
    'search': function(request){

        this.response = FormParser.parse(request);

        this.addAgeToCustomers();

        this.checkError(this.dataArray.length === 0);

        if(this.response.error === 1){
            return this.response;
        }

        let search_age = this.response.result.search_age;
        let search_name = this.response.result.search_name;
        
        if(Validate.checkStringEmpty(search_age)){

            this.filterByAgeRange(search_age);   
        }

        if(Validate.checkStringEmpty(search_name)){

            this.filterByName(search_name);            
        }

        return Customer.customerTableTemplate(this.dataArray);
    },
    /**
     * Sets the Response objects default error response for form parsing failure.
     * @param {Boolean} check 
     */
    'checkError': function(check){

        // For no errors "check" must be false
        if(check == true){
                        
            this.response.error = 1;

            this.response.message = '<span class="error">Unable to load the customers data.<br>Please constact support.</span>';
        }
    },
    /** Method: Search->attach
     * Attaches the result to the calling router.
     * @param {FormObject} request 
     * @returns 
     */
    'attach' : function(request){

        return this.search(request);
    }
};

export {
    Search
}
