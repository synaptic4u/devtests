import { App } from "../App/App.js";

/**
 * Object FormEventListener manages the events related to Forms.
 * Acts as a second level Routing object.
 */
const FormEventListener = {
    /**
     * Attaches a Event Listener to the submit event from a form. -> nodeName===FORM
     * Calls the App object which loads the Router to the method call.
     */
    'attach': function(){
        document.addEventListener("submit", function(event) {

            // Retrieve the current submitted form object
            let submittedForm = event.target;
        
            // Check if the event target is a form
            if (submittedForm && submittedForm.nodeName === "FORM") {

                console.log('Form id:', submittedForm.id);
                console.log('Form submitted:', submittedForm);
                        
                // Prevent the form from submitting (if needed)
                event.preventDefault();

                // Loads the App Top level Router with appType and RequestBody params.
                App.load(submittedForm.id, submittedForm);
            }
        }, true); 
    },
};

export {
    FormEventListener
};