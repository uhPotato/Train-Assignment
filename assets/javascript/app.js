

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDgUif1Sjwka2z0PZbB1H2xmZjYQKF2Aos",
    authDomain: "train-assignment-b4a2a.firebaseapp.com",
    databaseURL: "https://train-assignment-b4a2a.firebaseio.com",
    projectId: "train-assignment-b4a2a",
    storageBucket: "train-assignment-b4a2a.appspot.com",
    messagingSenderId: "59683896716"
  };
  firebase.initializeApp(config);



var clearInputs = function() {
$("#train-x").val("");
$("#city-x").val("");
$("#first-leaves-x").val("");
$("#leaves-every-x").val("");
};


var createNewTrainExpress = firebase.database();


// STORE TRAIN SCHEDULE IN FIREBASE
$("#add-button-x").on("click", function() {


// LETS CHECK TO SEE IF THE FORM IS EMPTY FIRST
if ( document.getElementById('train-x').value === '' || document.getElementById('city-x').value === '' || document.getElementById('first-leaves-x').value === '' || document.getElementById('leaves-every-x').value === '' ) {
alert("You need to enter all train information");
return false;
} else {

// SETUP VARIABLES FOR TRAIN SCHEDULE INFORMATION
// GET THE TRAININPUT TEXT
var train = $("#train-x").val().trim();

var city = $("#city-x").val().trim();

var firstLeaves = moment($("#first-leaves-x").val().trim(), "HH:mm").subtract(10, "years").format("X");

var leavesEvery = $("#leaves-every-x").val().trim();



var addTrainExpress = { name: train, destination: city, firstTrain: firstLeaves, frequency: leavesEvery };


createNewTrainExpress.ref().push(addTrainExpress);


clearInputs();


return false;
}
});



createNewTrainExpress.ref().on("child_added", function(childSnapshot, prevChildKey) {


var nameOfTrain = childSnapshot.val().name;

var nameOfCity = childSnapshot.val().destination;

var trainLeavesFirst = childSnapshot.val().firstTrain;

var trainFrequency = childSnapshot.val().frequency;


var differenceTimes = moment().diff(moment.unix(trainLeavesFirst), "minutes");
console.log ("difference in time: " + differenceTimes); 

var minutesLeft = moment().diff(moment.unix(trainLeavesFirst), "minutes") % trainFrequency;
console.log ("minutes left: " + minutesLeft); 


var totalTime = trainFrequency - minutesLeft;
console.log ("total time: " + totalTime); 



 
var nextTrainTime = moment().add(totalTime, "m").format("hh:mm A");
console.log ("arrival time: " + nextTrainTime); 

$("#table-express > tbody").append("<tr> <td>" + nameOfTrain + "</td> <td>" + nameOfCity + "</td> <td>" + trainFrequency + "</td> <td>" + nextTrainTime + "</td> <td>" + totalTime + "</td> </tr>");

});