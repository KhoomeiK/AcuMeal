let button;
let done = false;
setInterval(function () {
    if (button == null) {
        button = document.getElementsByClassName("stripe-button-el")[0];
    } else if (!done) {
        button.addEventListener("click", function () {
            if (find("email") == "") {
                return;
            }
            db.collection("ripyu").doc((new Date()).toString()).set({
                name: find("fname") + " " + find("lname"),
                email: find("email"),
                age: find("age"),
                height: find("height"),
                weight: find("weight"),
                gender: find("gender"),
                disease: find("healthcondition"),
                activity: find("activity"),
                workout: find("workout"),
                goal: find("goals"),
                cooktime: find("cooktime"),
                meal_count: find("meals"),
                fruitsDisliked: multiplefind("fruitdislike"),
                proteinPrefered: multiplefind("protein"),
                carbsPrefered: multiplefind("carbs"),
                flavourPreferd: multiplefind("flavour"),
                cuisine: multiplefind("cuisine"),
                allergies: multiplefind("allergies"),
                healthinessOfMeal: find("health"),
                wakeuptime: find("wakeuptime"),
                sleeptime: find("sleeptime")

            }).then(function () {
                console.log("Document successfully written!");
                document.getElementById("congratulations").innerText = "Congratulations"
            }).catch(function (error) {
                console.error("Error writing document: ", error);
            })
        });
        done = true;
    }
}, 100);

function find(thing) {
    return document.getElementById("survey").elements[thing].value;
}

function multiplefind(index) {
    let elems = document.getElementById("survey").elements[index];
    let ret = [];
    for (var i = 0; i < elems.length; i++) {
        if (elems[i].checked) {
            ret.push(elems[i].value)
        }
    }
    return ret;
}

//why doesn't this work