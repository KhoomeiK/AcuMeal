$(() => {
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
        for(var i = 0; i < 94; i++) {
            if (form[i].type == "text" || $(form[i]).is(":checked"))
                data.push(form[i].value);
        }
        console.log(data.length);
        console.log(data);

        if (data.length < 20) {
            alert("You haven't filled out all the questions");
            data = [];
        }
        else
            myDoc.update({
                data: {
                    age: data[0],
                    height: data[1],
                    weight: data[2],
                    gender: data[3],
                    meal: data[4],
                    condition: data[5],
                    activity: data[6],
                    workout: data[7],
                    goals: data[8],
                    cookTime: data[9],
                    want: data[10],
                    recipeWant: data[11],
                    meals: data[12],
                    fruits: data[13], // this needs to be fixed for multiple choices
                    protein: data[14],
                    carbs: data[15],
                    taste: data[16],
                    cuisine: data[17], // this needs to be fixed for multiple choices
                    allergies: data[18], // this needs to be fixed for multiple choices
                    healthy: data[20]
                }
            }).catch(error => {
                data = [];
            })
            .then(() => {
                data = [];
                console.log(data);
                // window.location.replace("http://www.thanks.com") // create thanks.html page
            });
    });
});
