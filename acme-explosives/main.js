
$(document).ready(function() {

  var categories = [];
  var types      = [];
  var products   = [];
  var fireworks  = [];
  var demolition = [];

// --------- First Promise (Loads from categories.json) ----------- //

  var loadAllCategories = function() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "jsonFiles/categories.json"
      }).done(function(data) {
        resolve(data);
      }).fail(function(xhr, status, error) {
        reject(error);
      });
    });
  };

// --------- Second Promise (Loads from types.json) ----------- //

  var loadAllTypes = function() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "jsonFiles/types.json"
      }).done(function(data) {

        var allTypes = data.types;
        for (i in allTypes) {
          if (allTypes[i].category === 0) {
            allTypes[i].category = "fireworks";
          } else {
            allTypes[i].category = "demolition";
          }
          types.push(allTypes[i]);
        };
        resolve(data);
      }).fail(function(xhr, status, error) {
        reject(error);
      });
    });
  };

// --------- Third Promise (Loads from products.json) ----------- //

  var loadAllProducts = function() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "jsonFiles/products.json"
      }).done(function(data) {
        resolve(data);
      }).fail(function(xhr, status, error) {
        reject(error);
      });
    });
  };

// ---------- Calling the nested promises ---------- //

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
        makeProductsArray(productsData);
      },
      function(reason) {
        console.log("Products didn't load properly", reason);
    });


// ----- Function to address clicked choice from catalog ----- //

  $('.dropdown-menu li a').click(function(){
    if(this.id === "fireworks") {
      populatePage(fireworks);
    } else if (this.id === "demolition") {
      populatePage(demolition);
    } else {
      populatePage(products);
    }
  });

// ----- Function to push all products into an array ----- //
  function makeProductsArray(data) {
    var realProducts = data.products[0];
    for (i in realProducts) {
      products.push(realProducts[i]);
    };
    makeSortedProductsArrays(products);
  };


// ----- Function to choose what is being added to page ----- //

  function makeSortedProductsArrays(products) {
    var sortedArray = [];

    $.each(products, function(index, value) {

      if (value.type < 3) {
        value.category = "fireworks";
        sortedArray.push(value);

      } else {
        value.category = "demolition";
        sortedArray.push(value);
      }
    });

    $.each(sortedArray, function(index, value) {
      var number = value.type;
      value.type = types[number].name;
    });

    $.each(sortedArray, function(index, value) {
      if (value.category === "fireworks") {
        fireworks.push(value);
      } else
      {
        demolition.push(value);
      }
    })

  };

// ----- Function to take the items from the array and display them on page ------ //

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


});  // ---- End of the document.ready function
