const functions = require('firebase-functions');
const admin = require("firebase-admin");
let serviceAccount = {
    type: "service_account",
    project_id: "acumeal-c8f89",
    private_key_id: "55a5470d0de9ef53b2d62ec87c6513f88587ad2d",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCFiVmywZonw/Yu\nbo3hiwRyfft6z+n0WzeHjly/f6QYfVjhf/SdPG42p/G9KxmDTZzmuWg9OcgadzS+\nz1PTRf0wsqHucPFlR5XDFbMHjCLKvZs+Pdz+dfkx/1Dryryi1PdeGH7c5ZAFUxyh\n3c3hjvD5CM85H4cpLIPlpCCdQWB9iqzWz7lZ26/ihwgc99Xj6PvWFa1pWvNkHrHl\nfeaXAgC/q5XU45/Eu5AvZllknTYotrfwT1xV2oLWblD7v5TjIRgX1CROUNbby+d8\nDvero2xYG4SRh+TuGYMfMXxGpd2EcLeaM1Ms2OM1O6v+U+jp+VUXZQnTWGJd6Uvw\n5siYa/mtAgMBAAECggEAANqFaXqcoALgmMT1JV1xDp8o05YTpv1vtaYMY978XOdt\nXKnwzJHv0iKe1p0U2E/Pe5eDGf9gWCb3EGvBkn2FZk84TDMce1jBlWRNwr0XFdhC\nSrc0qabj1UKgnt3PZnPr6SqSNHX+WObwCLP+Vmsh2n2tI7eyO7NcEw2l43AFnoWG\n+gZSAM80TiDTCOedg+1FX4ntSlDkAY+wfi90VCSiJsa8AK1QV6nlVgu5HpRyaNn8\nmo7V2yKIIYEZSKOolImYKey1Rku6NhDSVLFUUk17PLuc7hyuO4QX5YUL+qoRpu73\nEs06mw64RlubcIJS4JyM+mcsBUMBMNK+jVYPTIXZIwKBgQC6KOThKWSg6Drx+GyF\nKlfX3I0awAt17nOZi2+uwEMHhBKNZdiuR0zwAOFI9qeDKgaczFneITEcRX5eXpVd\n6lfCw1QrNnu4mjILUkoHlzz5cCyhba197RuFm+v8znBNeKM8gblOEfm+RKaY/IG8\npLCDaISAnV9KMB8hszajdfbgpwKBgQC3om5MLA+KeaD4lV8xDcPaBN+VADxOWS1a\ngzRyIz3mFSAsdFleRsTrYWvz1Dtee6yN3aJlCd4CdR+nhgXO986JFfxhlfno6bdM\ngZ+nMV9adnNZVZa1+a2kh/n8e0dlcYUbYqtbIuDy9Uf7wjHgctqjcZb9qaB5DakG\nRNJe1NjpiwKBgQC1ooDvUDvm46/ft8vqgk4DSCZFG2wTPP19qxblIqJECxEu9Vhd\ncyQWaEVns4Ht8GtTQe/NVAVe2E9cNFz4rVXDqmHNZ/N/QrPhaADjNyU/G7vwJdtJ\nKrfXvTKcD7BzZmme99Od4NwUUVdbncPYE7hF/wyJkQMQl7NIZlvBUa/3sQKBgCKC\nZ+/wp8sCKHoOuCDj0VZ7a/j4Xlzq7VcBKS356Xv/pFg2VUUeT4tcd4kO7UlIPJk8\neXQ7cnlLwXMeAKFweGPSuecs5BYdNdEu2u30nVLGx86WAwiXr0YoN5Z3JGev+a+3\nzzQFTfjal3h8ehsP+n6UridlZT7ajlUbQd2IamsZAoGALZSofFlujM0C6zXgUszt\n/GrdhnFxequPLOImXtXqVjBf1kZ4UAHnpDQ+eCHSqL1Is88UBDcMDVWA7INXOc6J\nJ9uu6/T5OxIoJZdhpJ327pNdXk4XPbbj+HdidCffgNB0W2I/U2S6NpXd/6CjDFiF\nQflj9TbLSYgPBJvu9m5gNHE=\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-cvzvv@acumeal-c8f89.iam.gserviceaccount.com",
    client_id: "102007954185942958827",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://accounts.google.com/o/oauth2/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-cvzvv%40acumeal-c8f89.iam.gserviceaccount.com"
}

var recipe = [];
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://acumeal-c8f89.firebaseio.com"
});
var db = admin.firestore();

exports.magic = functions.https.onCall((datas) => {


    let maxscore = 0;
    let indexi = 0;
    for (var i = 0; i < recipe.length; i++) {
        let newscore = score(datas, recipe[i]);
        console.log(recipe[i].name + " => " + newscore)
        if (newscore > maxscore) {
            maxscore = newscore;
            indexi = i;
        }
    }
    return recipe[indexi];
});

db.collection('recipe').get().then((snapshot) => {
    snapshot.forEach((doc) => {
        let carbs;
        if (doc.data().Carbohydrates === null)
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
    return "yay?"
}).catch((err) => {
    console.log('Error getting documents', err);
});

function score(person, recip) {
    let score = 0;
    for (var i = 0; i < recip.ingredients.length; i++) {
        for (var j = 0; j < person.carbsLiked.length; j++) {
            if (person.carbsLiked[j] === recip.ingredients[i].toLowerCase()) {
                score += 1 * randomize();
            }
        }
        for (j = 0; j < person.carbsDisliked.length; j++) {
            if (person.carbsDisliked[j] === recip.ingredients[i].toLowerCase()) {
                score -= 1 * randomize();
            }
        }
        for (j = 0; j < person.fruitsDisliked.length; j++) {
            if (person.fruitsDisliked[j] === recip.ingredients[i].toLowerCase()) {
                score -= 1 * randomize();
            }
        }
        for (j = 0; j < person.fruitsLiked.length; j++) {
            if (person.fruitsLiked[j] === recip.ingredients[i].toLowerCase()) {
                score += 1 * randomize();
            }
        }
        for (j = 0; j < person.vegetableDisliked.length; j++) {
            if (person.vegetableDisliked[j] === recip.ingredients[i].toLowerCase()) {
                score -= 1 * randomize();
            }
        }
        for (j = 0; j < person.vegetablesLiked.length; j++) {
            if (person.vegetablesLiked[j] === recip.ingredients[i].toLowerCase()) {
                score += 1 * randomize();
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
                score += 2 * randomize();
            }
        }
    }

    if (recip.taste !== undefined) {
        for (i = 0; i < recip.taste.length; i++) {
            for (j = 0; j < person.tasteLiked.length; j++) {
                if (person.tasteLiked[j] === recip.taste[i].toLowerCase()) {
                    score += 1 * randomize();
                }
            }
            for (j = 0; j < person.tasteDisliked.length; j++) {
                if (person.tasteDisliked[j] === recip.taste[i].toLowerCase()) {
                    score -= 1 * randomize();
                }
            }
        }
    }

    if (recip.cookTime > person.maxCookTime) {
        score -= (recip.cookTime - person.maxCookTime) / 10;
    }


    return score;
}

function randomize() {
    return Math.floor(Math.random() * 0.4 + 0.8 * 100) / 100;
}