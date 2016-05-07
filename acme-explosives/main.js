//"use strict";

$(document).ready(function() {

  var categories = [];
  var types      = [];
  var products   = [];

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
      var realProducts = data.products[0];
      for (i in realProducts) {
        products.push(realProducts[i]);
      };
      resolve(products);
    }).fail(function(xhr, status, error) {
      reject(error);
    });
  });
};


loadAllCategories()
  .then (
    function(categoriesData) {
      categories = categoriesData.categories;
      addDropDown();
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
      //makeProductArray(productsData);
      populatePage(productsData);

    },
    function(reason) {
      console.log("Products didn't load properly", reason);
  });
$( "select" ).on("change", function() {
});


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

// Function to insert select thingies dynamically
  // Loop over the categories and use key/values:
  // this.value will equal the category id
  // The value should be equal to the category
  // Name should be the name
function addDropDown() {
  $.each(categories, function(index, value) {
    $('#mySelect')
        .append($("<option></option>")
      .attr("value", value.id)
      .text(value.name));
  });
};

});  // End of the document.ready function
