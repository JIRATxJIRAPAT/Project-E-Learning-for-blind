var mongoose = require('mongoose');


const chapterSchema = new mongoose.Schema({
    id: {type:Number,require: true},
    title: {type: String,require: true},
    video: { type: String },
}); 

const categorySchema = new mongoose.Schema({
    type:{type:String}
})

var audiobookSchema = new mongoose.Schema({
    name: {type: String,require: true,unique: true},
    img: {type: String},
    desc: {type: String,require: true},
    chapters: [chapterSchema],
    category: {type: String,require: true},
    owner_id: {type: String, require:true},
    owner_name: {type: String, require:true},
});
 

const model = mongoose.model("AudioBook",audiobookSchema)
module.exports = model