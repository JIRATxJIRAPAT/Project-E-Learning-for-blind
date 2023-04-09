import React from 'react';
import { MDBBadge, MDBBtn} from 'mdb-react-ui-kit';

export default function Table(props) {
  return (

        <tr>
          <td>
            <div className='d-flex align-items-center'>
              
              <div className='ms-5'>
                <p className='fw-bold mb-1' tabIndex={0}>{props.name}</p>
                
              </div>
            </div>
          </td>
          <td>
            <p className='fw-normal mb-1'>progress</p>
          
          </td>
          <td>
            <MDBBadge color='success' pill>
              {`${props.status}`}
            </MDBBadge>
          </td>
          <td>{props.score}</td>
          <td>
            <MDBBtn color='link' rounded size='sm'>
              View
            </MDBBtn>
          </td>
        </tr>

  );
}