import { useEffect,useState } from 'react'
import axios from 'axios'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import TeacherTable from './teacherTable';


function createTable(course,key){
    return(
        <TeacherTable key={key} name={course.coursename} id={course.course_id}/>
    )
}


function TeacherProfile(props,key) {

    const [name, setCourseName] = useState('')
	const [img, setPic] = useState('')
    const [desc,setDescription] = useState('')
    const [chapters,setChapters] = useState([])
    const [quizs, setQuiz] = useState([]);
    const [video,setVideos] = useState([])
    const [owner_id,setOwnerID] = useState('')
    const [owner_name,setOwnerName] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:5000/api/course/${props.owned_courses}`)
            .then(res => [
            setCourseName(res.data.name),
            setPic(res.data.img),
            setDescription(res.data.desc),
            setChapters(res.data.chapters),
            setQuiz(res.data.quiz),
            setVideos(res.data.video),
            setOwnerID(res.data.owner_id),
            setOwnerName(res.data.owner_name),
            console.log("course",res.data)
            ])
            .catch(error => console.log(error));
    },[]);

    return(
        <MDBTable align='middle'>
        <MDBTableHead>
          <tr>
            <th scope='col' tabIndex={0}>Course name</th>
            <th scope='col' tabIndex={0}>number of student</th>
            <th scope='col' tabIndex={0}>Status</th>
            <th scope='col' tabIndex={0}>Score</th>
            <th scope='col' tabIndex={0}>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
            {props.owned_courses.map((course,key) => {
                return createTable(course)   
            })}
          
        </MDBTableBody>
      </MDBTable>
    )
}


export default TeacherProfile