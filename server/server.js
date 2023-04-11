const express = require('express');
const cors = require('cors')
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const multer = require('multer');
const path = require("path");
const mediaRoutes = require("./routes/media");
require('dotenv').config();

//model
const User = require('./model/user');
const Course = require('./model/course');
const AudioBook = require('./model/audiobook');
//./client/public/uploads/images/
const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,"../client/public/uploads/images/")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
 
var upload = multer({ storage: storage }).single('testImage');



const app = express();
app.use(cors())
app.use(express.json())

//Mongo connect ()=>res.send("create new course successful")
mongoose.connect(process.env.MONGO_CONNECT)

//User
app.post('/api/register',async (req,res) => {
    console.log(req.body);
    try{
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        })
        res.json({status:"ok"})
    }catch(err){
        console.log(err)
        res.json({status:"error",error: "Duplicate email"})
    }
    
})

app.post('/api/login',async (req,res) => {
    
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    
    if(user){
        const token = jwt.sign(
        {
            name: user.name,
            email: user.email
        },'secret123')

        user.token = token;
        user
        .save()
        //.then(() => res.json(user))
        /*.catch(err => res.status(400).json(`Error: ${err}`))*/
        return res.json({status:"ok",user: token,role:user.role})
    }
    else{
        return res.json({status:"error",user: false})
    }
    
})

app.get('/api/login', (req,res) => {
   
    const tk = `${req.body.token}`
    console.log("req",req.body.token)
    User.findOne({
        token: tk,
    }).then(user => res.json(user))
    .catch((err)=> res.status(400).json(`Error: ${err}`))
    
    
})

//Get user data
app.get('/api/getUser',async (req,res) => {
    const token = req.headers['x-auth-token']
    
    try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		const user = await User.findOne({ email: email })

		return res.json({ status: 'ok', user: user })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

//Course
app.post("/api/create",(req,res) => {
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const newCourse = new Course({
                name: req.body.name,
                img: req.file.originalname,
                desc: req.body.desc,
                owner_id: req.body.userid,
                owner_name: req.body.username
                
            });
            newCourse.save()
            .then(User.findById(req.body.userid)
                .then(user =>  {
                            
                    course = {
                        course_id: newCourse._id,
                        coursename: req.body.name ,
                    }

                    user.owned_course.push(course)
                    user.save()
                    .then(() => res.json(`Create new course!!`))
                    .catch(err => res.status(400).json(`Error: ${err}`))
                    }
                )
                .catch(err => res.status(400).json(`Error: ${err}`))
            )
            .catch((err)=>console.log(err));
        }
    })
})

app.get("/api/course",(req,res)=>{
    Course.find()
    .then(course => res.json(course))
    .catch((err)=> res.status(400).json(`Error: ${err}`))
})

app.get("/api/course/:id",(req,res)=>{
    Course.findById(req.params.id)
    .then(course => res.json(course))
    .catch((err)=> res.status(400).json(`Error: ${err}`))
})
//test
app.get("/api/course/quiz/:id",(req,res)=>{
    Course.findById(req.params.id)
    .then(course => res.json({question:JSON.stringify(course.quiz),choice:course.choice}))
    .catch((err)=> res.status(400).json(`Error: ${err}`))
})

app.put("/api/course/edit/:id",(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            
            Course.findById(req.params.id)
            .then(course => {
                course.name = req.body.name;
                course.img = req.file.originalname;
                course.desc = req.body.desc;
                //course.episodes.name = req.body.episodeName;
                course.pass_score = 2;
                course
                    .save()
                    .then(
                        User.updateMany(
                            { "enrolled.id": req.params.id } ,
                            { $set: { "enrolled.$.coursename" : req.body.name } }
                        ).then(() => res.json("Data update completed!!"))
                        .catch(err => res.status(400).json(`Error: ${err}`))
                    )
                    .catch(err => res.status(400).json(`Error: ${err}`))

            })
            .catch((err)=> res.status(400).json(`Error: ${err}`))

      
        }
    })
})

//Chapter
app.put("/api/createChapter/:id",(req,res) => {
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
    Course.findById(req.params.id)
    .then(course => {
        //course.name = req.body.name;
        //course.img = req.file.originalname;
        //course.desc = req.body.desc;
        //course.episodes.name = req.body.episodeName;
        const num = course.chapters.length + 1
        
        newChap = {
        
            id: num,
            title: req.body.episodeName

        }
        course.chapters.push(newChap)
        console.log(req.body.episodeName)
        course
            .save()
            .then(() => res.json("New Chapter Added!!"))
            .catch(err => res.status(400).json(`Error: ${err}`))

    })
    .catch((err)=> res.status(400).json(`Error: ${err}`))
    }
    })
})

//Quiz
app.put("/api/create/quiz/:id",(req,res) => {
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
    Course.findById(req.params.id)
    .then(course => {
        const num = course.quiz.length + 1
        newQuiz = {
            number:num,
            question: req.body.question,
            answer: req.body.answer,
            choice1: req.body.choice1,
            choice2: req.body.choice2,
       
        }
        course.quiz.push(newQuiz)
        
        course
            .save()
            .then(() => res.json("New Quiz Added!!"))
            .catch(err => res.status(400).json(`Error: ${err}`))

    })
    .catch((err)=> res.status(400).json(`Error: ${err}`))
    }
    })
})



//Enroll course
app.put("/api/enroll/:id",(req,res) => {
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            
            User.exists({ "enrolled.coursename":req.body.name, "email":req.body.email })
            .then(exists => {
                if (exists) {
                    return res.json("already enroll")
                } else {
                    User.findOne({email:req.body.email})
                    .then(user => {
                        
                        enroll = {
                            id: req.params.id,
                            coursename: req.body.name,
                            score: 0
                            
                        }
                            
                        console.log(req.body)
                        
                        user.enrolled.push(enroll)
                        
                        user
                            .save()
                            .then(
                                Course.findById(req.params.id)
                                .then(course => {
                                    
                                    student = {
                                        userid: user._id,
                                        username: user.name,
                                        score:0
                                    }
        
                                    course.students.push(student)
                                    course.save()
                                        .then(() => res.json(`Data update completed!!`))
                                        .catch(err => res.status(400).json(`Error: ${err}`))
                                    }
                                )
                                .catch(err => res.status(400).json(`Error: ${err}`))
                            )
                            .catch(err => res.status(400).json(`Error: ${err}`))
        
                    })
                    .catch((err)=> res.status(400).json(`Error: ${err}`))
                }
            })
        }


                    
 
        }
    )
})

//Enroll course
/*
app.put("/api/enroll/:id",(req,res) => {
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            User.findOne({email:req.body.email})
            .then(user => {
                
                enroll = {
                    id: req.params.id,
                    coursename: req.body.name,
                    score: 0
                    
                }
                    
                console.log(req.body)
                
                user.enrolled.push(enroll)
                
                user
                    .save()
                    .then(
                        Course.findById(req.params.id)
                        .then(course => {
                            
                            student = {
                                userid: user._id,
                                username: user.name,
                            }

                            course.students.push(student)
                            course.save()
                            .then(() => res.json(`Data update completed!!`))
                            .catch(err => res.status(400).json(`Error: ${err}`))
                            }
                        )
                        .catch(err => res.status(400).json(`Error: ${err}`))
                    )
                    .catch(err => res.status(400).json(`Error: ${err}`))

            })
            .catch((err)=> res.status(400).json(`Error: ${err}`))
        }
    })
})
*/
//Quiz submit
app.put("/api/quiz/submit", (req,res) => {
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{

            console.log(req.body)
            User.updateOne(
                { "enrolled.coursename": req.body.coursename ,"email":req.body.email},
                { $set: { "enrolled.$.score" : req.body.score , "enrolled.$.status": req.body.status} }
            )
            .then(() => res.json(`update success!! ${req.body.userid} ${req.body.status}`))
            .catch(err => res.status(400).json(`Error: ${err}  ${req.body.userid}`))
                
        
        }
    })
})

app.put("/api/chapter/create/:id", (req,res) => {
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            Course.findById(req.params.id)
            .then(course => {
                //course.name = req.body.name;
                //course.img = req.file.originalname;
                //course.desc = req.body.desc;
                //course.episodes.name = req.body.episodeName;
                const num = course.chapters.length + 1
                console.log(req.body.url)
                newChap = {
                
                id: num,
                title: req.body.episodeName,
                video: req.body.url
                }
                course.chapters.push(newChap)
                console.log(req.body.episodeName)
                course.save()
                    
            })
            .catch((err)=> res.status(400).json(`Error: ${err}`))
        }

    })
})
///////////// AUDIO BOOK //////////////////
app.post("/api/audiobook/create", (req,res) => {
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(req.body.category)
            AudioBook.create(
                {   "name": req.body.audioBookName,
                    "desc":req.body.desc,
                    "owner_id": req.body.userid,
                    "owner_name" : req.body.username,
                    "category":req.body.category
                }
                
            )
            .then(() => res.json(`create new audiobook`))
            .catch(err => res.status(400).json(`Error: ${err}`))
                
        
        }
    })
})

app.get("/api/audiobook",(req,res)=>{
    AudioBook.find()
    .then(audiobook => res.json(audiobook))
    .catch((err)=> res.status(400).json(`Error: ${err}`))
})
/////////////////////////////////////////////////////////

app.use("/api/v1/media", mediaRoutes);
app.use("/public", express.static(path.join(__dirname, "public")));

///////////////////////////////////////////////////////




app.listen(5000,() => {
    console.log("server started on port 5000")
})

