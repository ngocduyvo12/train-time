//Initialize fire base

var config = {
    apiKey: "AIzaSyB94CtnApLGD-EPvLq4M_ZqJjKId831kNE",
    authDomain: "test-b11a7.firebaseapp.com",
    databaseURL: "https://test-b11a7.firebaseio.com",
    projectId: "test-b11a7",
    storageBucket: "",
    messagingSenderId: "1047436246452",
    appId: "1:1047436246452:web:2eaba3148e3ff8bcd7c6e1"
}

firebase.initializeApp(config)

var database = firebase.database();

//Button for adding trains
$("#add-train-btn").on("click", function () {

    event.preventDefault();


    //get users input:
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    //get time stamp
    var startTimeInput = $("#start-input").val().trim();
    console.log(startTime)

    //prevent submiting empty boxes to table:
    // if (!trainName || !destination || !startTime || !frequency){
    //     alert("Please enter all the required information")
    //     return false
    // }
    //create local object for variables:
    var newTrain = {
        name: trainName,
        destination: destination,
        start: startTimeInput,
        frequency: frequency
    }

    //push object to firebase
    database.ref().push(newTrain)

    //clear all boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#start-input").val("");


    var timeFormat = "HH:mm";
    var startTime = moment(startTimeInput, timeFormat).subtract(1, "years");
    //calculate difference between start time to now:
    var diffTime = moment().diff(moment(startTime), "minutes")
    // console.log(startTimeInput)
    // console.log(diffTime)

    //calculate time apart:
    var tRemainder = diffTime % frequency;
    var tMinutesTillTrain = frequency - tRemainder;
    //console.log(tMinutesTillTrain)
    //add minutes till train to current time:
    var nextTrain = moment().add(tMinutesTillTrain, "minutes")
    //prettify time:
    moment(nextTrain).format("hh:mm A")

})

database.ref().on("child_added", function(childSnapshot){

    



})