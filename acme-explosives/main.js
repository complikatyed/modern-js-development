//"use strict";


// -- User selects a category from a dropdown.  -- //

// -- If user selects "Demolition" use Promises to:
//   1. load that 'demolition' array of objects from categories.json
//   2. load types.json
//   3. then products.json.


// -- If user selects "Fireworks" use Promises to:
//   1. load the 'fireworks' array of objects from categories.json
//   2. load types.json
//   3. then products.json.

// Once all data is loaded, display the products in a Bootstrap grid. //

// Each product must display string name of its product type, and product category. -->
// -- Do NOT display the integer id value -->








var loadProducts = function() {

  return new Promise(function (resolve, reject) {  // Resolve and reject will be functions we pass in later
    var productLoader = new XMLHttpRequest();

    productLoader.onload = function() {
      if(this.status === 200) {  // IF SUCCESS

        var data = JSON.parse(this.responseText);
          console.log(data);

          fillInventory(data); // <--- This function is not yet defined in this version

          resolve(inventory);  // Using whatever function gets passed in to the promise above

      } else {  // if failure

        reject(new Error(this.statusText)); // Reports back what the status was so you know what went wrong
      }
    }
    productLoader.onerror = function() {
      reject(new Error(
        'XMLHTTPRequest ERROR: ' + this.statusText
        ));
    }
    productLoader.open("GET", "jsonFiles/products.json");
    productLoader.send();
  });
};


// ---------- Function to take the items from the array and display them on page ------ //
function populatePage(data) {
  console.log(data);
}

// Calling the first Promise...

loadProducts().then (
  function(data) {
    populatePage(data);
  },
  function(reason) {
    console.log('something is not right', reason);
  }
);


// ----- PLANNING STEPS -------- //

// Function (event listener?) for detecting click on category choice
// That calls the first promise:  loadCategory().then ();

// inside it the second promise needs to get called:  loadTypes().then();

// then inside THAT, the third promise gets caled:  loadProducts().then();