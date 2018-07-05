function find(thing) {
    return document.getElementById("survey").elements[thing].value;
}

function multiplefind(index) {
    let elems = document.getElementById("survey").elements[index];
    let ret = [];
    for (var i = 0; i < elems.length; i++) {
        if (elems[i].checked) {
            ret.push(elems[i].value)
        } else if (elems[i].type == text) {
            ret.push(elems[i].value)
        }
    }
    return ret;
}


function science() {
    if (find("email") === "") {
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
}

//why doesn't this work
//this is for sceince