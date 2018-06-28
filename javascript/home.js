// Initialize Firebase
    // This is the code we copied and pasted from our app page
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyA_sE05LjOxLBep2ZaRVEyTnPZtykv6BE4",
        authDomain: "myfirstproject-66206.firebaseapp.com",
        databaseURL: "https://myfirstproject-66206.firebaseio.com",
        projectId: "myfirstproject-66206",
        storageBucket: "myfirstproject-66206.appspot.com",
        messagingSenderId: "968561816017"
      };
      firebase.initializeApp(config);
          var database = firebase.database();
    
        var name = "";
        var destination ="";
        var time = "";
        var frequency = "";
    
        $("#add-user").on("click", function(event){
            event.preventDefault();
    
            name = $("#name-input").val().trim();
            destination = $("#destination-input").val().trim();
            time = $("#time-input").val();
            frequency = $("#min-input").val().trim();
            
            database.ref().push({
                name: name,
                destination: destination,
                time: time,
                frequency: frequency,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
    
            }); 
        });
    
        database.ref().on("child_added", function(childSnapshot){
            console.log(childSnapshot.val().name);
            console.log(childSnapshot.val().destination);
            console.log(childSnapshot.val().time);
            console.log(childSnapshot.val().frequency);
            console.log(childSnapshot.val().dateAdded);
            var arrival = childSnapshot.val().time.split(":");
            var firsttime = moment().hours(arrival[0]).minutes(arrival[1]);
            var max = moment.max(moment(),firsttime);
            var minute;
            var trainarrival;
            if(max === firsttime){
                trainarrival = firsttime.format("hh:mm A");
                minute = firsttime.diff(moment(),"minutes");
            }
            else{
                var diff = moment().diff(firsttime, "minutes");
                var remain = diff%childSnapshot.val().frequency;
                minute = childSnapshot.val().frequency - remain;
                trainarrival = moment().add(minute,"m").format("hh:mm A");
            }
            var body = $("#full-train-list");
            var row = $("<tr>");
            var trainname = $("<td>").text(childSnapshot.val().name);
            var des = $("<td>").text(childSnapshot.val().destination);
            var fre = $("<td>").text(childSnapshot.val().frequency);
            var next = $("<td>").text(trainarrival);
            var away = $("<td>").text(minute);
             row.append(trainname,des,fre,next,away);
            // full list of item
            body.append(row);
    
        });
    