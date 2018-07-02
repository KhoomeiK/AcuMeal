const admin = require("firebase-admin");
const fs = require('fs');

var serviceAccount = require("acumeal-c8f89-firebase-adminsdk-cvzvv-55a5470d0d");
var recipe = [];

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://acumeal-c8f89.firebaseio.com"
});

var db = admin.firestore();

let persona = {
    calories: 2000,
    tasteLiked: ["sour"],
    tasteDisliked: ["sweet"],
    maxCookTime: 60,
    allergies: [],
    carbsLiked: ["bread", "potatoes"],
    carbsDisliked: ["corn", "black beans", "kidney beans"],
    fruitsLiked: ["strawberry", "banana", "orange", "plum"],
    fruitsDisliked: ["pomegranate"],
    vegetablesLiked: ["broccoli", "spinach", "cucumbers", "carrots", "green beans", "cauliflower"],
    vegetableDisliked: ["zucchini", "celery", "brussel sprouts", "okra"],
    cuisineLiked: ["indian"],
    cusineDisliked: ["japaneese"]
}

db.collection('recipe').get().then((snapshot) => {
    snapshot.forEach((doc) => {
        let carbs;
        if (doc.data().Carbohydrates == null)
            carbs = "28.1";
        else
            carbs = doc.data().Carbohydrates.replace("g", "");
        let index = recipe.push({
            name: doc.id,
            calories: doc.data().Calories.slice(0, doc.data().Calories.length - 4),
            carbs: carbs,
            cookTime: doc.data()["Cooking Time"].slice(0, doc.data()["Cooking Time"].length - 3),
            ingredients: doc.data().Ingredients,
            taste: doc.data().Taste,
            meal: doc.data().Meal,
            cuisine: doc.data().Cuisine
        });
    });

    fs.writeFile('save.json', JSON.stringify(recipe), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    //console.log(recipe[0])

    let maxscore = 0;
    let indexi = 0;
    for (var i = 0; i < recipe.length; i++) {
        let newscore = score(persona, recipe[i]);
        console.log(recipe[i].name + " => " + newscore)
        if (newscore > maxscore) {
            maxscore = newscore;
            indexi = i;
        }
    }
    console.log("I choose you " + recipe[indexi].name + "!")
}).catch((err) => {
    console.log('Error getting documents', err);
});

function score(person, recip) {
    let score = 0;
    for (var i = 0; i < recip.ingredients.length; i++) {
        for (var j = 0; j < person.carbsLiked.length; j++) {
            if (person.carbsLiked[j] === recip.ingredients[i].toLowerCase()) {
                score += 1;
            }
        }
        for (j = 0; j < person.carbsDisliked.length; j++) {
            if (person.carbsDisliked[j] === recip.ingredients[i].toLowerCase()) {
                score -= 1;
            }
        }
        for (j = 0; j < person.fruitsDisliked.length; j++) {
            if (person.fruitsDisliked[j] === recip.ingredients[i].toLowerCase()) {
                score -= 1;
            }
        }
        for (j = 0; j < person.fruitsLiked.length; j++) {
            if (person.fruitsLiked[j] === recip.ingredients[i].toLowerCase()) {
                score += 1;
            }
        }
        for (j = 0; j < person.vegetableDisliked.length; j++) {
            if (person.vegetableDisliked[j] === recip.ingredients[i].toLowerCase()) {
                score -= 1;
            }
        }
        for (j = 0; j < person.vegetablesLiked.length; j++) {
            if (person.vegetablesLiked[j] === recip.ingredients[i].toLowerCase()) {
                score += 1;
            }
        }
        for (j = 0; j < person.allergies.length; j++) {
            if (person.allergies[j] === recip.ingredients[i].toLowerCase()) {
                score -= 1000000000000000000000;
            }
        }
    }
    for (j = 0; j < person.cuisineLiked.length; j++) {
        if (recip.cuisine !== undefined) {
            if (person.cuisineLiked[j] === recip.cuisine.toLowerCase()) {
                score += 1 * 2;
            }
        }
    }

    if (recip.taste != undefined) {
        for (var i = 0; i < recip.taste.length; i++) {
            for (j = 0; j < person.tasteLiked.length; j++) {
                if (person.tasteLiked[j] === recip.taste[i].toLowerCase()) {
                    score += 1;
                }
            }
            for (j = 0; j < person.tasteDisliked.length; j++) {
                if (person.tasteDisliked[j] === recip.taste[i].toLowerCase()) {
                    score -= 1;
                }
            }
        }
    }

    if (recip.cookTime > person.maxCookTime) {
        score -= (recip.cookTime - person.maxCookTime) / 10;
    }


    return score;
}