//"use strict";
var categories = [];
var types      = [];
var products   = [];

$( "#everything" ).click(function() {
  loadAllCategories()
  .then (
    function(categoriesData) {
      categories = categoriesData.categories;
      return loadAllTypes();
    },
    function(reason) {
      console.log("Categories didn't load properly", reason);
  })
  .then (
    function(typesData){
      types = typesData.types;
      return loadAllProducts();
    },
    function(reason) {
      console.log("Types didn't load properly", reason);
  })
  .then (
    function(productsData) {
      products = productsData.products;
      makeProductArray(productsData);
    },
    function(reason) {
      console.log("Products didn't load properly", reason);
  });
});

// ---------- If user selects "Demolition" ---------- //

$( "#demolition" ).click(function() {
  console.log("Demolition clicked");
});

// ---------- If user selects "Fireworks" ---------- //

$( "#fireworks" ).click(function() {
  console.log("Fireworks clicked");
});


// --------- First Promise (Loads from categories.json) ----------- //

var loadAllCategories = function() {

  return new Promise(function (resolve, reject) {
    var categoryLoader = new XMLHttpRequest();

    categoryLoader.onload = function() {
      if(this.status === 200) {  // IF SUCCESS

        var data = JSON.parse(this.responseText);

        // --- 'resolve' is a variable here, the --- //
        // --- actual function name gets passed  --- //
        // --- in when we call the promise later --- //
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

var loadAllTypes = function() {

  return new Promise(function (resolve, reject) {  // Resolve and reject will be functions we pass in later
    var typeLoader = new XMLHttpRequest();

    typeLoader.onload = function() {
      if(this.status === 200) {  // IF SUCCESS

        var data = JSON.parse(this.responseText);

        // --- 'resolve' is a variable here, the --- //
        // --- actual function name gets passed  --- //
        // --- in when we call the promise later --- //
        resolve(data);

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

var loadAllProducts = function() {

  return new Promise(function (resolve, reject) {
    var productLoader = new XMLHttpRequest();

    productLoader.onload = function() {
      if(this.status === 200) {  // IF SUCCESS

        var data = JSON.parse(this.responseText);

        resolve(data);

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


// ---------- Converts data from one big object (full of product objects)  ----------- //
// ---------- into array of smaller objects with the keys we'll need later ----------- //

var makeProductArray = function(data) {

  var foo = data.products[0];

  var productArray = [];

  for(i in foo) {

  var tempType = foo[i].type;

      switch (tempType) {
      case 0:
        foo[i].type = "Personal";
        foo[i].category = "Fireworks";
        break;
      case 1:
        foo[i].type = "Wedding";
        foo[i].category = "Fireworks";
        break;
      case 2:
        foo[i].type = "Neighbors";
        foo[i].category = "Fireworks";
        break;
      case 3:
        foo[i].type = "Family";
        foo[i].category = "Demolition";
        break;
      case 4:
        foo[i].type = "Insurance";
        foo[i].category = "Demolition";
        break;
      case 5:
        foo[i].type = "Lawn and Garden";
        foo[i].category = "Demolition";
        break;
    }

    // --- Creates a new (smaller) object with the keys we'll need later.      --- //
    // --- NOTE:  the new object has to be declared inside the loop or ALL the --- //
    // ---        objects in the array will be overwritten w last item's data  --- //

    var myObject = {
      name: '',
      description: '',
      category: '',
      type: ''
    };

    // --- Adds the data from the objects to our new object --- //
    myObject.name = foo[i].name;
    myObject.description = foo[i].description;
    myObject.category = foo[i].category;
    myObject.type = foo[i].type;

    // --- Add the new object to the array --- //
    productArray.push(myObject);

   }

   populatePage(productArray);
};


// ---------- Function to take the items from the array and display them on page ------ //

function populatePage(productArray) {

  var productString = "";



  $.each(productArray, function (index, value) {
    productString += `<div class="col-sm-4 card"><h3 class="name">${value.name}</h3>`
    productString += `<p class="description">${value.description}</p>`
    productString += `<p class="type">Category: ${value.category}</p>`
    productString += `<p class="type">Type: ${value.type}</p></div>`
  });

  $("#products").html(productString);
};
