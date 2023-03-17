const express = require('express');
const cors = require('cors')
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const multer = require('multer');
const path = require("path");

//model
const User = require('./model/user');
const Course = require('./model/course');
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

mongoose.connect('mongodb://localhost:27017/e-learning',{
    useNewUrlParser: true,
  })

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
                
            });
            newCourse.save()
            .then(()=>res.send("successful"))
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

app.put("/api/course/edit/:id",(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            Course.findById(req.params.id)
            .then(course => {
                course.name = req.body.name;
                //course.img = req.file.originalname;
                course.desc = req.body.desc;
                //course.episodes.name = req.body.episodeName;

                course
                    .save()
                    .then(() => res.json("Course update completed!!"))
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
        
        newQuiz = {
        
            question: req.body.question,
            answer: req.body.answer,
            choice:[{
                text: req.body.choice1,
                value: "1",
                isAns: req.body.value
            },
            {
                text: req.body.choice2,
                value: "2",
                isAns: req.body.value2
            }]
            
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

//Enroll
app.put('/api/enroll/:id',(req,res) => {

    
})

const mediaRoutes = require("./routes/media");
app.use("/api/v1/media", mediaRoutes);
app.use("/public", express.static(path.join(__dirname, "public")));

app.get('/api/login', (req,res) => {
   
    const tk = `${req.body.token}`
    console.log("req",req.body.token)
    User.findOne({
        token: tk,
    }).then(user => res.json(user))
    .catch((err)=> res.status(400).json(`Error: ${err}`))


})

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

app.use("/api/v1/media", mediaRoutes);
app.use("/public", express.static(path.join(__dirname, "public")));

//Enroll
app.put('/api/enroll/:id',(req,res) => {

    
})


app.listen(5000,() => {
    console.log("server started on port 5000")
})
