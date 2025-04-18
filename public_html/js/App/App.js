import { Router } from "../Router/Router.js";

/**
 * Object App
 * Initiates the app by dynamically attaching the route to the Router.
 * App -> init only runs Top Level Controllers which will have their own sub-routing functionality.
 * App -> load only runs Second Level Controllers - instead of method overload, SL Controllers always pass variable requiring additional logic. 
 */
const App = {
    /** Property: appType
     * This is the route passed through to the Router object to load the correct controller
     */
    'appType': null,
    /** Method: init
     * Tries to load the Router's controller, runs the response methods if set. Passes a resourceURL param.
     * @param {String} appType  apps Router's route.
     */
    'init': function(appType){

        this.appType = appType;

        // Loads the routes Controller into the router & initiates.
        try{
            let router = Router;

            router.getRouter(this.appType, this.resourceURL);

            this.loadResponse(router.response);
        }catch(error){

            console.error('An error occurred:', error.message);
        }
    },
    /**  Method: load
     * Tries to load the Router's controller, runs the response methods if set.
     * Called from FormEventListener & Top level controllers, event listeners pass the Request through to the Apps router again.
     * @param {String} appType apps Router's route.
     * @param {Form} requestBody Form is passed through to the router as param.
     */
    'load': function(appType, requestBody){

        this.appType = appType;

        // Loads the routes Controller into the router & initiates.
        try{
            let router = Router;

            router.loadRouter(this.appType, requestBody);
            console.log(router);
            
            this.loadResponse(router.response);
        }catch(error){

            console.error('An error occurred:', error.message);
        }
    },
    /**
     * App -> loadResponse Updates html UI with app's response.
     * @param {Response} response 
     */
    'loadResponse': function (response){

        console.log('loadResponse'+response)
            // Null is the default value of the Response objects properties.
            response.initMessage();

            response.initResult();

            response.initJSCall();
    }
};

export {
    App
}