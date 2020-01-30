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

    //prevent submitting empty boxes to table:
    if (!trainName || !destination || !startTimeInput || !frequency){
        alert("Please enter all the required information")
        return false
    }
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
})

database.ref().on("child_added", function (childSnapshot) {

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;
    //get time stamp
    var startTimeInput = childSnapshot.val().start;
    //set time format
    var timeFormat = "HH:mm";

    //created variable for initial time
    var startTime = moment(startTimeInput, timeFormat).subtract(1, "years");
    //calculate difference between start time to now:
    var diffTime = moment().diff(moment(startTime), "minutes")

    //calculate time apart:
    var tRemainder = diffTime % frequency;
    var tMinutesAway = frequency - tRemainder;
    //console.log(tMinutesAway)
    //add minutes till train to current time:
    var nextTrain = moment(moment().add(tMinutesAway, "minutes")).format("hh:mm A")

    //create a new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesAway),
    )

    //push to html table body
    $("#table-row").append(newRow)
})