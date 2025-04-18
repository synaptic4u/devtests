/**
 * Object Validate checks for basic validation. Only chcks for empty strings.
 */
const Validate = {
    /** 
     * Validate that the field is not empty. Checks for empty or null values. Returns false if field is empty.
     * @param {String} value 
     * @returns Bool
     */
    'checkStringEmpty': function(value){

        switch (true) {
            case (value == null):
                return false;
                break;

            case (value == undefined):
                return false;
                break;

            case (value == ''):
                return false;
                break;
    
            case (value.trim() == ''):
                return false;
                break;
        
            default:
                return true;
                break;
        }
        
    }
};

export {
    Validate
}