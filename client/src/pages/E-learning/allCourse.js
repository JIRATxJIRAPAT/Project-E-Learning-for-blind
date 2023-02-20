import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar1 from '../../components/Navbar'
import Button from 'react-bootstrap/Button'


const AllCourse = () => {
    const [name, setCourseName] = useState('')
	const [img, setPic] = useState('')
    const [courses,setCourse] = useState([])

    useEffect(() => {
      
      axios.get("http://localhost:5000/api/course/")
      .then(res => setCourse(res.data))
      .catch(error => console.log(error));
    });
    
    /*
    useEffect(() => {
        axios.get(`api/course/${course.match.param.id}`)
        .then((response)=>[
            setCourseName(response.data.name),
            setPic(response.data.image)
        ])
        .catch((err)=> console.log(err));

    },[])
    */
    
    function Enroll(id){

		
		axios.put(`http://localhost:5000/api/enroll/${id}`)
        .then((res)=>console.log(res.data))
        .catch((err)=>{
            console.log(err);
        })
    }
    return(
        <div>
        <Navbar1 />
        {courses.map((course,key) => (
            <div className='container' key={key}>
                <h2>{`${course.name}` }</h2>
                <img src={`/uploads/images/${course.img}` } width="20%" height="10%" />
                
                <Link to={{pathname:`/course/${course._id}`}}>
                    <h5 className="example" tabIndex="0">view</h5>
                </Link>
                <Link to={{pathname:`/course/edit/${course._id}`}}>
                    <h5 className="example" tabIndex="0">edit</h5>
                </Link>
                
            </div>
        ))}
        
        </div>
    )
}

export default AllCourse