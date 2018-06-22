$(document).ready(function () {
    var app = firebase.initializeApp({
        apiKey: "AIzaSyDV7SDc8Q6tbiAenlBPM5iHZ6ew5rhmA0o",
        authDomain: "acumeal-c8f89.firebaseapp.com",
        databaseURL: "https://acumeal-c8f89.firebaseio.com",
        projectId: "acumeal-c8f89",
        storageBucket: "acumeal-c8f89.appspot.com",
        messagingSenderId: "741968191320"
    });

    var db = firebase.firestore();
    var uid = window.location.href.split("?", 2)[1];
    var myDoc = db.collection("users").doc(uid);

    var form = "";
    var data = [];

    $("#sub").click(()=> {
        form = $("#q").submit(val => {return false;})[0];
        for(var i = 0; i < 10; i++) {
            console.log(form[i].type);
            if (form[i].type == "text" || $(form[i]).is(":checked"))
                data.push(form[i].value);
        }

        myDoc.update({
            data: {
                age: data[0],
                height: data[1],
                weight: data[2],
                gender: data[3],
                activity: data[4]
            }
        }).then(window.location.replace("http://www.thanks.com")); // create thanks.html page
    });

});