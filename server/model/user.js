const mongoose = require("mongoose")

const enrollSchema = new mongoose.Schema({
    id: {type:String,require: true},
    coursename: {type: String,require: true},
    score:{type: Number,default:0},
    status:{type:Boolean,default:false}
});


const followerSchema = new mongoose.Schema({
    id: {type:String,require: true , unique: true},
    username: {type: String,require: true},
    score:{type: Number,default:0},
    status:{type:Boolean,default:false}
});

const owned_course = new mongoose.Schema({
    course_id: {type: String,require: true,unique:true},
    coursename: {type: String,require: true,unique:true},
    followers: [followerSchema] 
})



const User = new mongoose.Schema(
    {
        name: {type: String,require: true},
        email: {type: String,require: true,unique: true},
        password: {type: String,require: true},
        role: {type: String,require: true},
        token:{type:String},
        enrolled:[enrollSchema],
        owned_course:[owned_course]
    
    },
    {collection:'user-data'}
)

const model = mongoose.model("UserData",User)

module.exports = model