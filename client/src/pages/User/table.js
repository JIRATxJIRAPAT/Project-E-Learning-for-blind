import React from 'react';
import { MDBBadge, MDBBtn} from 'mdb-react-ui-kit';
import "../../css/table.css"

export default function Table(props) {
  return (

        <tr className='tr'>
          <td>
            <div className='d-flex align-items-center'>
              
              <div className='ms-5'>
                <p className='fw-bold mb-1' tabIndex={0}>{props.name}</p>
                
              </div>
            </div>
          </td>

          <td>
            {`${props.status}`=== "false" &&
              <MDBBadge color='danger' pill tabIndex={0}>
                {`${props.status}`}
              </MDBBadge>
            }
            {`${props.status}`=== "true" &&
              <MDBBadge color='success' pill tabIndex={0}>
                Pass
              </MDBBadge>
            }

          </td>
          <td tabIndex={0}>{`${props.score}`}</td>
          <td>
            <MDBBtn color='success' rounded size='nm' href={`http://localhost:3000/course/${props.id}`}>
              View
            </MDBBtn>
          </td>
        </tr>

  );
}