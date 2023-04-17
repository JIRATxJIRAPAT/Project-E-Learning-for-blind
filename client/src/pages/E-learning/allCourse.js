import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar1 from '../../components/Navbar'
import CourseCard from '../../components/CourseCard'
import Card2 from '../../components/Card2'
import "../../css/card2.css"
import Button from 'react-bootstrap/Button';
/*

        {courses.map((course,key) => (
            <div className='container' key={key}>
                <Link to={{pathname:`/course/${course._id}`} }>
                <h2>{`${course.name}` }</h2>
                <img src={`/uploads/images/${course.img}` } width="20%" height="10%" alt={`${course.name}`}/>
                
                </Link>

            </div>
            
        ))}
<Link to={{pathname:`/course/edit/${course._id}`}}>
                    <button className="example" tabIndex="0">edit</button>
                </Link>
*/

function CreateCourseCard(course,key){
    return(
        <CourseCard key={course._id} name={course.name} img={course.img} desc={course.desc} _id={course._id}/>
    )
}

const AllCourse = () => {

    const [courses,setCourse] = useState([])
    const [role,setRole] = useState('')
    
    useEffect(() => {
      
      axios.get("http://localhost:5000/api/course/")
      .then(res => setCourse(res.data))
      .catch(error => console.log(error));
    
      setRole(localStorage.getItem("role"))
    },[]);
    

    return(
        <div>
            <Navbar1 />
            {role === "teacher" && 
                <>
                <br></br>
                <div className="mb-4">
                    <Button variant="success" size="lg" href='/course/create'>
                        Create New Course
                    </Button>
                </div>
                </>
            }
            <div className="container">
                {courses.map((course,id) => CreateCourseCard(course,id))}
            </div>
        </div>
    )
}

export default AllCourse