
var mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
    id: {type:Number,require: true},
    title: {type: String,require: true},

}); 

const choiceSchema = new mongoose.Schema({
    text: {type: String,require: true},
    value: {type: String,require: true},
    isAns: {type: Boolean,require: true}
});

const quizSchema = new mongoose.Schema({
    question: {type: String,require: true},
    answer: {type: String,require: true},
    choice: [choiceSchema]
});


var courseSchema = new mongoose.Schema({
    name: {type: String,require: true},
    img: {type: String,require: true},
    desc: {type: String,require: true},
    chapters: [chapterSchema],
    quiz: [quizSchema]
});
 
//Image is a model which has a schema imageSchema

const model = mongoose.model("Course",courseSchema)
module.exports = model