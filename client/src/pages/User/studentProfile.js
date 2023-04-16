import "../../css/table.css"
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

import Table from './table';


/*            <h2>complete Course</h2>
            <div>{props.enrolled.map(function(course){
                    if(`${course.status}` === "true"){
                        return (<>
                            
                                <div>{course.coursename}</div>
                                <div>score:{course.score} status:{`${course.status}`}</div> </>
                            )
                    }


                   
                    }
                )}    
            
            </div>
            <h2>INcomplete Course</h2>
            <div>{props.enrolled.map(function(course){
                    if(`${course.status}` === "false"){
                        return (<>
                            
                                <ul className='rectangle'>
                                    <li>score:{course.score} status:{`${course.status}`}</li>
                                </ul> </>
                            )
                    }


                   
                    }
                )}    
            
            </div>*/
function createTable(course,key){
    return(
        <Table key={key} id={course.id} name={course.coursename} score={course.score} status={course.status}/>
    )
}

function StudentProfile(props,key) {

    return(
   
        <MDBTable align='middle' responsive>
            <caption >Enrolled Course</caption>
            <MDBTableHead>
                
            <tr className="tr">
                <th scope='col' tabIndex={0}>Course name</th>
                
                <th scope='col' tabIndex={0}>Status</th>
                <th scope='col' tabIndex={0}>Score</th>
                <th scope='col' tabIndex={0}>Actions</th>
            </tr>
            </MDBTableHead>
            <MDBTableBody>
                {props.enrolled.map((course,key) => {
                        if(`${course.status}` === "true"){
                            return createTable(course)                 
                        }
                    }
                )}
                {props.enrolled.map(function(course,key){
                        if(`${course.status}` === "false"){
                            return createTable(course)          
                        }
                    }
                )}        
            
            </MDBTableBody>
        </MDBTable>

    
    )
}


export default StudentProfile