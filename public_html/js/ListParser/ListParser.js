import { FormParser } from "../FormParser/FormParser.js";
import { Response } from "../Response/Response.js"
import { Sanitize } from "../Sanitize/Sanitize.js";
import { Validate } from "../Validate/Validate.js";

/**
 * Object ListParser. Second Level Controller. Responsible for logic to parse comma delimeted strings from forms.
 */
const ListParser = {
    'response': Response,
    /** 
    * Method ListParser->parseList
    * Parses the form & then the list. 
    */
    'parseList': function(submittedForm){
        
        // Get the form fields value
        this.response = FormParser.parse(submittedForm);
        
        // Should return false if validation fails for a empty/null/bad value that we cannot process.
        if(!Validate.checkStringEmpty(this.response.result.to_sort)){

            this.response.error = 1;
            this.response.result = null;

            this.response.message = '<span class="error">The textarea cannot be empty!<br>Please provide a comma seperated list of values.</span>';
            
            return this.response;
        }
        
        // Sanitize csv list
        let sortedResult = Sanitize.csvList(this.response.result.to_sort);
        
        // Checks if the string isnt empty. If csv list is string of empty commas.
        if(!sortedResult){

            this.response.error = 1;
            this.response.result = null;

            this.response.message = '<span class="error">The comma seperated list cannot be empty values!<br>Please provide a comma seperated list of values.</span>';
            
            return this.response;
        }

        // Build the result
        this.response.result = '<span class="info">Sorted List: ' + sortedResult + '</span>';

        return this.response;
    },
    /** Method: ListParser->attach
     * Attaches the result to the calling router.
     * @param {FormObject} request 
     * @returns 
     */
    'attach' : function(request){

        return this.parseList(request);
    }
}

export {
    ListParser 
}