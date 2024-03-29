import { useEffect,useState } from 'react'
import { MDBBadge, MDBBtn} from 'mdb-react-ui-kit';
import axios from 'axios';
import "../../css/table.css"

export default function TeacherTable(props) {
    const [number,setNumber] = useState(0)

    axios.get(`https://e-learning-backends.onrender.com/api/course/${props.id}`)
    .then(res => [
        setNumber(res.data.students.length),
        console.log("course",res.data)
    ])
    .catch(error => console.log(error));

  return (

        <tr className="tr">
          <td>
            <div className='d-flex align-items-center'>
              
              <div className='ms-5'>
                <p className='fw-bold mb-1' tabIndex={0}>{props.name}</p>
                
              </div>
            </div>
          </td>
          <td>
            <p className='fw-normal mb-1' tabIndex={0} style={{fontSize:"15px"}}>{number}</p>
          
          </td>
          <td>
            <MDBBadge color='success' pill tabIndex={0}>
              open
            </MDBBadge>
          </td>
          <td>
          <MDBBtn color='link' href={`/course/edit/${props.id}`} rounded size='md' >
              Edit
            </MDBBtn>
          </td>
          <td>
            <MDBBtn color='link' href={`/course/${props.id}`} rounded size='md' >
              View
            </MDBBtn>
          </td>

        </tr>

  );
}