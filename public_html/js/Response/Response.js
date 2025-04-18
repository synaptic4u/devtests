
/**
 * Object Response
 * Properties default with null to enable easy checking in other object.
 * Property error defaults to 0 to represent success. 1 for failure. 
 * Property message - uses html div tag with message ID.
 * Property result - uses html div tag with result ID.
 */
const Response = {
    'error': 0,
    'message': null,
    'JSCall': null,
    'result': null,
    /**
     * Response -> initMessage Rewrites html div tag with message ID. 
     * Toggles visibility using classes.
     * Deletes message if called with empty params & hides div tag.
     */
    'initMessage': function (){
        console.log(this.message);

        let messageDiv = document.getElementById('message');

        messageDiv.classList.remove('visible');
        messageDiv.classList.add('hidden');

        messageDiv.innerHTML = "";

        if (this.message != null) {
          
            messageDiv.classList.remove('hidden');
            messageDiv.classList.add('visible');

            messageDiv.innerHTML = this.message;
        } 

        this.message = null;
    },
    /**
     * Response -> initJSCall Creates dynamic module calls. 
     * May not work with standard JS calls.
     * Deletes script tag from DOM after it's called.
     */
    'initJSCall': function (){
        
        for (const key in this.JSCall) {
            
            let dynamic = document.createElement("script");
            dynamic.setAttribute("id", "dynamic");
            dynamic.setAttribute("type", "module");

            let calls = document.createTextNode((this.JSCall[key]).replace("'", ""));
            dynamic.appendChild(calls);
            document.body.appendChild(dynamic);
            
            document.getElementById('dynamic').remove();
        }
        this.JSCall = null;
    },
    /**
     * Response -> initResult Rewrites the HTML content with the result.
     * Result must be formatted and structured already.
     * Uses HTML div tag with result ID.
     */
    'initResult': function (){
        let resultDiv = document.getElementById('result');

        resultDiv.classList.remove('visible');
        resultDiv.classList.add('hidden');

        resultDiv.innerHTML = "";

        if (this.result != null && this.error === 0) {
          
            resultDiv.classList.remove('hidden');
            resultDiv.classList.add('visible');

            resultDiv.innerHTML = this.result;
        } 
        
        this.result = null;
    },
};

export {
    Response
}