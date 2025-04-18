import { Response } from "../Response/Response.js";

/**
 * Object Customer
 * Parses a custom customers iterable object into a display result based upon a search.
 * Cusomer -> customerTableTemplate Parses the object into HTMl table.
 */
const Customer = {
    'response': Response,
    /**
     * Builds the HTML table filling it with the customers array.
     * @param {Array} customers 
     * @returns 
     */
    'customerTableTemplate': function(customers){

        this.response.result = `
            <div class="overflow-x:auto;">
                <table class="table-customer">
                    <thead>
                        <tr>
                            <td class="table-heading">Name</td>
                            <td class="table-heading">Age</td>
                        </tr>
                    </thead>
                    <tbody>`;    

        for (const customer of customers) {
            
            this.response.result += `<tr><td>` + customer.name + `</td><td>` + customer.age + `</td></tr>`;
        };
        
        this.response.result += `</tbody></table></div>`;

        return this.response;
    }
};

export {
    Customer
}
