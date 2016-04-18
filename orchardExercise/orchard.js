"use strict";

var counter = 0;
var output = document.getElementById("output");
// ------------------------ Create a Plant function. --------------------------------- //


// Plant should have a property of height.
// The Plant prototype should have two methods on it: increaseHeight and decreaseHeight.
// Each method should accept an integer value as input.

var Plant = function() {
  this.height = 0;

};

// increaseHeight should increase the value of the height property by the amount passed in as an argument.

Plant.prototype.increaseHeight = function (amountGrown) { // amount the plant should grow
  this.height += amountGrown;

};

// decreaseHeight should decrease the value of the height property by the amount passed in as an argument.

Plant.prototype.decreaseHeight = function (amountTrimmed) {
  this.height -= amountTrimmed;
};



// --------------------------  Create a Tree function. ----------------------------- //

// The prototype of Tree should be Plant
// Tree should have a property of branches.

var Tree = function () {
  this.branches = 0;
  this.growthCount = 0;
};

Tree.prototype = new Plant();

// The Tree prototype should have two methods on it: grow and trim.
// The grow method should accept an integer value as input.
// The grow method should increase the height of the tree.

Tree.prototype.grow = function (amount) {
  this.increaseHeight(amount);
  this.growthCount += amount;

// Each time the height of a tree increases by 10,
// the value of branch should increase by one.

  while (this.growthCount >= 10 ) {
    this.growthCount -= 10;
    this.branches++;
  }
};

// The trim method should accept an integer value as input.
// The trim method should decrease the height of the tree.
// When the trim method is called, the number of branches should decrease by one.

Tree.prototype.trim = function (amount) {
  this.decreaseHeight(amount);
  this.branches--;
};



// Create a PearTree instance of Tree.

var PearTree = new Tree();

// Create an OakTree instance of Tree.

var OakTree = new Tree();


// increase the height the pear tree by some integer value and
// increase the height the oak tree by some integer value that is larger than what you used for the pear tree.

function growOrchard (pearAmount, oakAmount) {
  PearTree.grow(pearAmount);
  OakTree.grow(oakAmount);
  console.log("Trees grew");
};

// Every tenth time the trees are grown, invoke the trim method.
   // Pass one value to the method for the pear tree, and a larger value to the method on the oak tree.

function trimTrees (pearAmount, oakAmount) {
  PearTree.trim(pearAmount);
  OakTree.trim(oakAmount);
  console.log("Trees trimmed");
};

// Every second, grow the trees

var timer = setInterval(function() {

  growOrchard(6, 11);

  // ----- increment the counter (so we can count how many times it has grown)
  counter ++;

  // ---- Invoke trim method every tenth time trees are grown.
  if (counter % 10 === 0) {
    trimTrees(2, 4);
  }

  // ----- Stop growing the trees after they have grown 30 times.
  if (counter === 30) {
    clearInterval(timer);
  };

  // ----- Output the current height of each tree and its number of branches.
  displayTrees();
}, 1000 );  // Timer is set to run the functions very second




function displayTrees() {
  output.innerHTML += `<p>${counter}</p><p>Pear tree is now ${PearTree.height} cm tall and has ${PearTree.branches} branches</p><p>Oak tree is now ${OakTree.height} cm tall and has ${OakTree.branches} branches</p>`;
};

