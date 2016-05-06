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




var displayCategory = function () {

};

// ---------- Converts data from one big object (full of product objects)  ----------- //
// ---------- into array of smaller objects with the keys we'll need later ----------- //

var makeProductArray = function(foo) {

  var productArray = [];

  for(i in foo) {

    // --- Creates a new (smaller) object with the keys we'll need later.      --- //
    // --- NOTE:  the new object has to be declared inside the loop or ALL the --- //
    // ---        objects in the array will be overwritten w last item's data  --- //
    var myObject = {
      name: '',
      description: '',
      type: ''
    };

    // --- Adds the data from the objects to our new object --- //
    myObject.name = foo[i].name;
    myObject.description = foo[i].description;
    myObject.type = foo[i].type;

    // --- Add the new object to the array --- //
    productArray.push(myObject);

   }

   return productArray;
};

 // var type = "";
 //    var category = "";

 //    switch (tempType) {
 //      case 0:
 //        foo[i].type = "Personal";
 //        foo[i].category = "Fireworks";
 //        break;
 //      case 1:
 //        type = "Wedding";
 //        category = "Fireworks";
 //        break;
 //      case 2:
 //        type = "Neighbors";
 //        category = "Fireworks";
 //        break;
 //      case 3:
 //        type = "Family";
 //        category = "Demolition";
 //        break;
 //      case 4:
 //        type = "Insurance";
 //        category = "Demolition";
 //        break;
 //      case 5:
 //        type = "Lawn and Garden";
 //        category = "Demolition";
 //        break;
 //    }



// --------- First Promise (Loads from categories.json) ----------- //

var loadCategory = function() {

  return new Promise(function (resolve, reject) {  // Resolve and reject will be functions we pass in later
    var categoryLoader = new XMLHttpRequest();

    categoryLoader.onload = function() {
      if(this.status === 200) {  // IF SUCCESS

        var data = JSON.parse(this.responseText);
        console.log("FIRST PROMISE LOADED!");
        console.log("First category is", data.categories[0].name);
        console.log("Second category is", data.categories[1].name);

        resolve(data);

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


// --------- Second Promise (Loads from types.json) ----------- //

var loadTypes = function() {

  return new Promise(function (resolve, reject) {  // Resolve and reject will be functions we pass in later
    var typeLoader = new XMLHttpRequest();

    typeLoader.onload = function() {
      if(this.status === 200) {  // IF SUCCESS

        var data = JSON.parse(this.responseText);
        var typesObject = data.types;
        console.log(typesObject);
        resolve(typesObject);

      } else {

        reject(new Error(this.statusText));
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

// --------- Third Promise (Loads from products.json) ----------- //

var loadProducts = function() {

  return new Promise(function (resolve, reject) {
    var productLoader = new XMLHttpRequest();

    productLoader.onload = function() {
      if(this.status === 200) {  // IF SUCCESS

        var data = JSON.parse(this.responseText);

        var productsObject = data.products[0];

        resolve(productsObject);

      } else {

        reject(new Error(this.statusText));
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
  console.log("THIRD PROMISE LOADED!");
};

// -------------------- Calling the Promises... ------------------------------- //

// ------------ Calling the first promise ---------- //

loadCategory()
.then (
  function(categoriesData) {
    return loadTypes();
  },
  function(reason) {
    console.log("Category didn't load properly", reason);
})
.then (function(typesData){
  return loadProducts();
})
.then (function(productsData) {
  makeProductArray(productsData);

});


// ----- PLANNING STEPS -------- //

// Function (event listener?) for detecting click on category choice
// That calls the first promise:  loadCategory().then ();

// inside it the second promise needs to get called:  loadTypes().then();

// then inside THAT, the third promise gets caled:  loadProducts().then();