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