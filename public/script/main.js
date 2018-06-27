$(() =>  {
    var app = firebase.initializeApp({
        apiKey: "AIzaSyDV7SDc8Q6tbiAenlBPM5iHZ6ew5rhmA0o",
        authDomain: "acumeal-c8f89.firebaseapp.com",
        databaseURL: "https://acumeal-c8f89.firebaseio.com",
        projectId: "acumeal-c8f89",
        storageBucket: "acumeal-c8f89.appspot.com",
        messagingSenderId: "741968191320"
    });
    
    var db = firebase.firestore();
    var myDoc = "";

    function signInButton() {
	    const provider = new firebase.auth.GoogleAuthProvider(); // sign in with firebase
	    firebase.auth().signInWithPopup(provider).then((result) => {
            var user = result.user;
            myDoc = db.collection("users").doc(user.uid);
            myDoc.set({"Name": user.displayName}).then( () => {
                window.location.replace("/public/survey.html?" + user.uid);
            });
        });
    }

    $("#sign").click(()=>{ // waits for sign in button to be clicked
		console.log("signing in");
		signInButton();
	});
});