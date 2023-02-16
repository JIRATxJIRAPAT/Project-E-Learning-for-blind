import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar1 from '../../components/Navbar'


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
    return(
        <div>
        <Navbar1 />
        {courses.map((course,key) => (
            <div className='container' key={key}>
                <h2>{`${course.name}` }</h2>
                <img src={`/uploads/images/${course.img}` } width="30%" height="10%" />
                
                <Link to={{pathname:`/course/${course._id}`}}>
                    <h2 className="example" tabIndex="0">view</h2>
                </Link>
                <Link to={{pathname:`/course/edit/${course._id}`}}>
                    <h2 className="example" tabIndex="0">edit</h2>
                </Link>
            </div>
        ))}
        
        </div>
    )
}

export default AllCourse