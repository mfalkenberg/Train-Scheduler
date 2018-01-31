var config = {
    apiKey: "AIzaSyCaIH371LjjUdQmk1xNwXacXs_fV9TD6Vk",
    authDomain: "train-scheduler-1df42.firebaseapp.com",
    databaseURL: "https://train-scheduler-1df42.firebaseio.com",
    projectId: "train-scheduler-1df42",
    storageBucket: "",
    messagingSenderId: "736886311211"
  };
  firebase.initializeApp(config);

var database = firebase.database();

var train = "";
var destination = "";
var firstTrain = "";
var frequency = "";
var minutesAway = "";

$("#click-button").on("click", function() {
      // Prevent the page from refreshing
  event.preventDefault();

  train = $("#train-input").val().trim();
  destination = $("#des-input").val().trim();
  firstTrain = $("#first-input").val().trim();
  frequency = $("#frequ-input").val().trim();
  // minutesAway = moment([firstTrain]).fromNow();

  // Change what is saved in firebase
  database.ref().push({
    train: train,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  });
});

database.ref().on("value", function(snapshot) {
      // Print the initial data to the console.
      var data = snapshot.val();
      console.log(data);
      $("#displayed-data").empty();
      // https://stackoverflow.com/questions/40086525/having-trouble-iterating-through-javascript-objects
      snapshot.forEach(function(child){
      	if (typeof child.val() == "object"){
      		$("#displayed-data").append(child.val().train + " | " + child.val().destination + " | " + child.val().firstTrain + " | " + child.val().frequency+"<br>\n");
      	}
      });


/*
      // Log the value of the various properties
      console.log(snapshot.val().train);
      console.log(snapshot.val().destination);
      console.log(snapshot.val().firstTrain);
      console.log(snapshot.val().frequency);
      
      $("#displayed-data").append(snapshot.val().train + " | " + snapshot.val().destination + " | " + snapshot.val().firstTrain + " | " + snapshot.val().frequency);
*/
  },  function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });




