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


// if category.


var displayCategory = function () {

}


var findObjectKeys = function(foo) {
  for(i in foo) {
    console.log (foo[i].name);
    console.log (foo[i].description);
  }
};




var loadProducts = function() {

  return new Promise(function (resolve, reject) {  // Resolve and reject will be functions we pass in later
    var productLoader = new XMLHttpRequest();

    productLoader.onload = function() {
      if(this.status === 200) {  // IF SUCCESS

        var data = JSON.parse(this.responseText);

        var thingy = data.products[0];

          findObjectKeys(thingy);

          //resolve(data);

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


var loadCategory = function() {

  return new Promise(function (resolve, reject) {  // Resolve and reject will be functions we pass in later
    var categoryLoader = new XMLHttpRequest();

    categoryLoader.onload = function() {
      if(this.status === 200) {  // IF SUCCESS

        var data = JSON.parse(this.responseText);

          console.log("First category is", data.categories[0].name);
          console.log("Second category is", data.categories[1].name);

      } else {  // if failure

        reject(new Error(this.statusText)); // Reports back what the status was so you know what went wrong
      }
    }
    categoryLoader.onerror = function() {
      reject(new Error(
        'XMLHTTPRequest ERROR: ' + this.statusText
        ));
    }
    categoryLoader.open("GET", "jsonFiles/categories.json");
    categoryLoader.send();
  });
};

var loadTypes = function() {

  return new Promise(function (resolve, reject) {  // Resolve and reject will be functions we pass in later
    var typeLoader = new XMLHttpRequest();

    typeLoader.onload = function() {
      if(this.status === 200) {  // IF SUCCESS

        var data = JSON.parse(this.responseText);


          console.log("First type is", data.types[0].name);

          //fillInventory(data); // <--- This function is not yet defined in this version

          //resolve(inventory);  // Using whatever function gets passed in to the promise above

      } else {  // if failure

        reject(new Error(this.statusText)); // Reports back what the status was so you know what went wrong
      }
    }
    typeLoader.onerror = function() {
      reject(new Error(
        'XMLHTTPRequest ERROR: ' + this.statusText
        ));
    }
    typeLoader.open("GET", "jsonFiles/types.json");
    typeLoader.send();
  });
};







// ---------- Function to take the items from the array and display them on page ------ //
function populatePage(data) {
  console.log(data);
};

// -------------------- Calling the Promises... ------------------------------- //

// ------------ Calling the first promise ---------- //

loadCategory().then (
  function(data) {
  },
  function(reason) {
    console.log("Category didn't load properly", reason);
  }
);


// ---------- Calling the second promise ---------- //

loadTypes().then (
  function(data) {
  },
  function(reason) {
    console.log("Types didn't load properly", reason);
  }
);

// ---------- Calling the third promise ---------- //

loadProducts().then (
  function(data) {
    // Function that sends the data to the DOM
    populatePage(data);
  },

  function(reason) {
    console.log("Products didn't load properly", reason);
  }
);


// ----- PLANNING STEPS -------- //

// Function (event listener?) for detecting click on category choice
// That calls the first promise:  loadCategory().then ();

// inside it the second promise needs to get called:  loadTypes().then();

// then inside THAT, the third promise gets caled:  loadProducts().then();