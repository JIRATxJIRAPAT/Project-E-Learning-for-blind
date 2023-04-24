const Media = require("./Media");

var mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({

    videos: { type: String },
    

});
  

const chapterSchema = new mongoose.Schema({
    id: {type:Number,require: true},
    title: {type: String,require: true},
    video: { type: String },
}); 

const choiceSchema = new mongoose.Schema({
    text: {type: String,require: true},
    value: {type: String,require: true},
    isAns: {type: Boolean,require: true}
});

const quizSchema = new mongoose.Schema({
    number:{type: Number,default:0},
    question: {type: String,require: true},
    answer: {type: String,require: true},
    choice1: {type: String,require: true},
    choice2:{type: String,require: true},
});

const studentSchema = new mongoose.Schema({
    userid: {type: String, require:true,unique:true},
    username: {type: String, require:true,unique:true},
    score:{type:Number,default:0},
    status:{type:Boolean,default:false}
})

var courseSchema = new mongoose.Schema({
    name: {type: String,require: true},
    img: {type: String,require: true},
    desc: {type: String,require: true},
    chapters: [chapterSchema],
    quiz: [quizSchema],
    pass_score: {type: Number},
    owner_id: {type: String, require:true},
    owner_name: {type: String, require:true},
    students: [studentSchema]
});
 
//Image is a model which has a schema imageSchema

const model = mongoose.model("Course",courseSchema)
module.exports = model