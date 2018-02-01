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

$("#click-button").on("click", function() {
      
  event.preventDefault();

  var train = $("#train-input").val().trim();
  var destination = $("#des-input").val().trim();
  //convert time from HH:mm to Unix
  var firstTrain = moment($("#first-input").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequ-input").val().trim();

  database.ref().push({
    train: train,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  });
  //clear the input dispaly
  $("#train-input").val("");
  $("#des-input").val("");
  $("#first-input").val("");
  $("#frequ-input").val("");

});  

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  var train = childSnapshot.val().train;
  var destination = childSnapshot.val().destination;
  var firstTrain = parseInt(childSnapshot.val().firstTrain);
  var frequency = childSnapshot.val().frequency;

  var frequencySeconds = frequency * 60;
  var now = parseInt(moment().format("X"));

  while (now > firstTrain) {
    firstTrain += frequencySeconds
  }
  var nextTrain = moment(firstTrain, "X").format("HH:mm");
  var minutesAway = Math.ceil((firstTrain - now) / 60);

  $("#train-table > tbody").append("<tr><td>" + train + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + nextTrain + "</td><td>" + minutesAway + "</td></tr>");

});

