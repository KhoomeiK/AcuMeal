const functions = require('firebase-functions');
const DecisionTree = require('decision-tree');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.analyze = functions.firestore.document("users/{uid}")
.onWrite((change, context) => {
  const doc = change.data(); // gets user document that was written
  // write your algorithm here using doc

  var training_data = [
    {"color": "blue", "shape": "square", "liked":false },
    {"color": "red", "shape": "square", "liked":false}, 
    {"color":"blue", "shape":"circle", "liked":true},
    {"color":"red", "shape":"circle", "liked":true},
    {"color":"blue", "shape":"hexagon", "liked":false},
    {"color":"red", "shape":"hexagon", "liked":false},
    {"color":"yellow", "shape":"hexagon", "liked":true},
    {"color":"yellow", "shape":"circle", "liked":true}
  ];

  var test_data = [
    {"color":"blue", "shape":"hexagon", "liked":false},
    {"color":"red", "shape":"hexagon", "liked":false},
    {"color":"yellow", "shape":"hexagon", "liked":true},
    {"color":"yellow", "shape":"circle", "liked":true}
  ]
  var class_name = "liked";

  var features = ["color", "shape"];

  var dt = new DecisionTree(training_data, class_name, features);

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");

  var predicted_class = dt.predict({
    color: "blue",
    shape: "hexagon"
  });

  var accuracy = dt.evaluate(test_data);

  var treeModel = dt.toJSON();

  var mealPlan = "";

  return change.after.ref.update({
    mealPlan: mealPlan // set some mealPlan variable to whatever meal plan the algorithm created
  }, {merge: true});
})});