/**
 * Object Utils
 * Utility object for things I want to refactor but not needing their own objects.
 */
const Utils = {
    /**
     * Utils->submitBtnDisable
     * Disables all submit buttons.
     */
    'submitBtnDisable': function(){
        
        // Find all input elements with type="submit"
        const submitButtons = document.querySelectorAll('input[type="submit"]');

        // Loop through each button and disables them.
        submitButtons.forEach(button => {
            button.disabled = true;
        });
    }
};

export {
    Utils
};