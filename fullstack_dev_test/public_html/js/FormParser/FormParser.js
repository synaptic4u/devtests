import { Response } from "../Response/Response.js";

/**
 * Object FormParser handles form parsing.
 */
const FormParser = {
    'response': Response,
    'fields': {},
    /** 
     * Parses the form input values. Scoped for current application needs.
     * @param {FormObject} form Form Object is required.
     * @returns {Response} response
     */
    'parse': function (form){

        this.response.error = 0;

        this.checkError(form.elements.length < 1);

        if(this.response.error === 0){

            this.response.result = {};

            for (const key in form.elements) {

                // console.log(key);
                // console.log(form.elements[key].type);
                // console.log(form.elements[key].value);
                switch (true) {
                
                    case (form.elements[key].type === "text"):
                        this.response.result[form.elements[key].name] = form.elements[key].value;
                        break;
                
                    case (form.elements[key].type === "textarea"):
                        this.response.result[form.elements[key].name] = form.elements[key].value;
                        break;

                    case (form.elements[key].type === "select-one"):
                        this.response.result[form.elements[key].name] = form.elements[key].value;
                        break;
                }
            }
            // console.log('this.response.result');
            // console.log(this.response.result);
        }

        // console.log(Object.keys(this.response.result).length < 1);
        this.checkError(Object.keys(this.response.result).length < 1);

        return this.response;
    },
    /**
     * Sets the Response objects default error response for form parsing failure.
     * @param {Boolean} check 
     */
    'checkError': function(check){

        // For no errors "check" must be false
        if(check == true){
                        
            this.response.error = 1;

            this.response.message = '<span class="error">Unable to parse form fields.<br>Please constact support.</span>';
        }
    }
};

export {
    FormParser
}