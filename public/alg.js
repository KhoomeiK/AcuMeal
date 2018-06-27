var DecisionTree = require('decision-tree');

var training_data = [
    {"age":"18-26", "totalinches": "90-100","weight":"150-160", "gender":"male","mealtime":"","healthcondition":"","activitylevel":"","workouttype":"","goal":"","cooktime":"","proteinsource":"","carbsource":"","tastes":"","cuisine":"","alergies":"","healthy":"","meal": "" },
    {"age":"27-35", "totalinches": "90-100","weight":"170-180", "gender":"female","mealtime":"","healthcondition":"","activitylevel":"","workouttype":"","goal":"","cooktime":"","proteinsource":"","carbsource":"","tastes":"","cuisine":"","alergies":"","healthy":"","meal": "" },
    {"age":"36-40", "totalinches": "90-100","weight":"180-190", "gender":"male","mealtime":"","healthcondition":"","activitylevel":"","workouttype":"","goal":"","cooktime":"","proteinsource":"","carbsource":"","tastes":"","cuisine":"","alergies":"","healthy":"","meal": "" },
    {"age":"40-50", "totalinches": "90-100","weight":"190-200", "gender":"female","mealtime":"","healthcondition":"","activitylevel":"","workouttype":"","goal":"","cooktime":"","proteinsource":"","carbsource":"","tastes":"","cuisine":"","alergies":"","healthy":"","meal": "" },
    {"age":"40-50", "totalinches": "90-100","weight":"180-190", "gender":"male","mealtime":"","healthcondition":"","activitylevel":"","workouttype":"","goal":"","cooktime":"","proteinsource":"","carbsource":"","tastes":"","cuisine":"","alergies":"","healthy":"","meal": "" },
    {"age":"30-40", "totalinches": "90-100","weight":"170-180", "gender":"female","mealtime":"","healthcondition":"","activitylevel":"","workouttype":"","goal":"","cooktime":"","proteinsource":"","carbsource":"","tastes":"","cuisine":"","alergies":"","healthy":"","meal": "" },
    {"age":"20-30", "totalinches": "90-100","weight":"120-130", "gender":"","mealtime":"","healthcondition":"","activitylevel":"","workouttype":"","goal":"","cooktime":"","proteinsource":"","carbsource":"","tastes":"","cuisine":"","alergies":"","healthy":"","meal": "" },
    {"age":"20-30", "totalinches": "90-100","weight":"160-170", "gender":"","mealtime":"","healthcondition":"","activitylevel":"","workouttype":"","goal":"","cooktime":"","proteinsource":"","carbsource":"","tastes":"","cuisine":"","alergies":"","healthy":"","meal": "" },
    {"age":"30-40", "totalinches": "40-50","weight":"140-150", "gender":"","mealtime":"","healthcondition":"","activitylevel":"","workouttype":"","goal":"","cooktime":"","proteinsource":"","carbsource":"","tastes":"","cuisine":"","alergies":"","healthy":"","meal": "" },
    {"age":"50-60", "totalinches": "90-100","weight":"170-180", "gender":"","mealtime":"","healthcondition":"","activitylevel":"","workouttype":"","goal":"","cooktime":"","proteinsource":"","carbsource":"","tastes":"","cuisine":"","alergies":"","healthy":"","meal": "" },
    {"age":"50-60", "totalinches": "50-70","weight":"200-210", "gender":"","mealtime":"","healthcondition":"","activitylevel":"","workouttype":"","goal":"","cooktime":"","proteinsource":"","carbsource":"","tastes":"","cuisine":"","alergies":"","healthy":"","meal": "" },
    {"age":"60-70", "totalinches": "70-90","weight":"210-220", "gender":"","mealtime":"","healthcondition":"","activitylevel":"","workouttype":"","goal":"","cooktime":"","proteinsource":"","carbsource":"","tastes":"","cuisine":"","alergies":"","healthy":"","meal": "" },
    {"age":"20-30", "totalinches": "50-60","weight":"250-260", "gender":"","mealtime":"","healthcondition":"","activitylevel":"","workouttype":"","goal":"","cooktime":"","proteinsource":"","carbsource":"","tastes":"","cuisine":"","alergies":"","healthy":"","meal": "" },
    {"age":"25-45", "totalinches": "40-50","weight":"230-240", "gender":"","mealtime":"","healthcondition":"","activitylevel":"","workouttype":"","goal":"","cooktime":"","proteinsource":"","carbsource":"","tastes":"","cuisine":"","alergies":"","healthy":"","meal": "" },
    {"age":"35-45", "totalinches": "35-50","weight":"250-260", "gender":"","mealtime":"","healthcondition":"","activitylevel":"","workouttype":"","goal":"","cooktime":"","proteinsource":"","carbsource":"","tastes":"","cuisine":"","alergies":"","healthy":"","meal": "" },
    {"age":"45-55", "totalinches": "20-30","weight":"130-140", "gender":"","mealtime":"","healthcondition":"","activitylevel":"","workouttype":"","goal":"","cooktime":"","proteinsource":"","carbsource":"","tastes":"","cuisine":"","alergies":"","healthy":"","meal": "" },
    {"age":"65-75", "totalinches": "40-30","weight":"190-200", "gender":"","mealtime":"","healthcondition":"","activitylevel":"","workouttype":"","goal":"","cooktime":"","proteinsource":"","carbsource":"","tastes":"","cuisine":"","alergies":"","healthy":"","meal": "" },
    {"age":"30-50", "totalinches": "50-60","weight":"130-140", "gender":"","mealtime":"","healthcondition":"","activitylevel":"","workouttype":"","goal":"","cooktime":"","proteinsource":"","carbsource":"","tastes":"","cuisine":"","alergies":"","healthy":"","meal": "" },
    {"age":"50-60", "totalinches": "50-60","weight":"130-140", "gender":"","mealtime":"","healthcondition":"","activitylevel":"","workouttype":"","goal":"","cooktime":"","proteinsource":"","carbsource":"","tastes":"","cuisine":"","alergies":"","healthy":"","meal": "" },

];
var test_data = [
    {"gender":"female", "shape":"hexagon", "liked":false},
    {"gender":"female", "shape":"hexagon", "liked":false},
    {"gender":"male", "shape":"hexagon", "liked":true},
    {"gender":"male", "shape":"circle", "liked":true}
]
var class_name = "meal";

var features = ["color", "shape"];


var dt = new DecisionTree(training_data, class_name, features);

var predicted_class = dt.predict({
    age: "",
    totalinches: "circle",
    weight: "",
    gender: "",
    mealtime:"",
    healthcondition:"",
    activitylevel: "",
    workoutype:"", 
    goal:"",
    cooktime:"",
    proteinsource:"",
    carbsource:"", 
    tastes:"",
    cusine:"", 
    alergies:"",
    healthy:"",
    meal:"",
});

var accuracy = dt.evaluate(test_data);

var treeModel = dt.toJSON();
console.log(predicted_class);