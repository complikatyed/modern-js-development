$(document).ready(function() {

  var categories  = [];
  var types       = [];
  var products    = [];
  var sortedArray = [];
  var fireworks   = [];
  var demolition  = [];

// ----- First Promise (Loads from categories.json) ----- //

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

// ----- Second Promise (Loads from types.json) ----- //

  var loadAllTypes = function() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "jsonFiles/types.json"
      }).done(function(data) {
        matchCategoryToType(data);
        resolve(data);
      }).fail(function(xhr, status, error) {
        reject(error);
      });
    });
  };

// ----- Third Promise (Loads from products.json) ----- //

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
    if(this.id === 'fireworks') {
      populatePage(fireworks);
    } else if (this.id === 'demolition') {
      populatePage(demolition);
    } else {
      populatePage(products);
    }
  });

// ----- Pushes all products from object into an array ----- //

  function makeProductsArray(data) {
    var i;
    var realProducts = data.products[0];
    for (i in realProducts) {
      products.push(realProducts[i]);
    }
    makeStringifiedProductsArrays(products);
  }

// ----- Matches category to type and creates types array ----- //

  function matchCategoryToType(data) {
    var allTypes = data.types;
    for (i in allTypes) {
      if (allTypes[i].category === 0) {
        allTypes[i].category = 'fireworks';
      } else {
        allTypes[i].category = 'demolition';
      }
      types.push(allTypes[i]);
    };
  };

// ----- Converts product info from integers to words ----- //

  function makeStringifiedProductsArrays(products) {
    stringifyCategoryData(products);
    stringifyTypeData(sortedArray);
    makeSpecificArrays(sortedArray);
  };

// --- Adds category name in words based on product type --- //

  function stringifyCategoryData(products) {
    $.each(products, function(index, value) {
      if (value.type < 3) {
        value.category = 'fireworks';
        sortedArray.push(value);
      } else {
        value.category = 'demolition';
        sortedArray.push(value);
      }
    });
  };

// ----- Changes type value from integer to name --- //
  function stringifyTypeData(sortedArray) {
    $.each(sortedArray, function(index, value) {
      var number = value.type;
      value.type = types[number].name;
    });
  };

// ----- Creates separate arrays for fireworks and demo products --- //

  function makeSpecificArrays(sortedArray) {
    $.each(sortedArray, function(index, value) {
      if (value.category === 'fireworks') {
        fireworks.push(value);
      } else
      {
        demolition.push(value);
      }
    });
  };

// ----- Takes products from an array and displays them on page ------ //

  function populatePage(productArray) {

    var productString = '';

    $.each(productArray, function (index, value) {
      productString += `<div class="col-sm-4 card"><h3 class="name">${value.name}</h3>`;
      productString += `<p class="description">${value.description}</p>`;
      productString += `<p class="type">Category: ${value.category}</p>`;
      productString += `<p class="type">Type: ${value.type}</p></div>`;
    });

    $('#products').html(productString);
  };


});  // ---- End of the document.ready function
