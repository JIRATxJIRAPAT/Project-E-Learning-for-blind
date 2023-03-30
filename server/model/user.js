const mongoose = require("mongoose")

const enrollSchema = new mongoose.Schema({
    id: {type:Number,require: true},
    coursename: {type: String,require: true},
    score:{type: Number,default:0},
    status:{type:Boolean,default:false}
}); 



const User = new mongoose.Schema(
    {
        name: {type: String,require: true},
        email: {type: String,require: true,unique: true},
        password: {type: String,require: true},
        role: {type: String,require: true},
        token:{type:String},
        enrolled:[enrollSchema]
    
    },
    {collection:'user-data'}
)

const model = mongoose.model("UserData",User)

module.exports = model