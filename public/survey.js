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

    db.collection('users').get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            console.log(doc.id);
        });
    });

    var uid = window.location.href.split("?", 2)[1];
    console.log(uid);

    var form = "";

    $("#sub").click(()=> {
        form = $("#q").submit(val => {return false;})[0];
        for(var i = 0; i < 5; i++)
            console.log(form[i].value);
    });
    
});