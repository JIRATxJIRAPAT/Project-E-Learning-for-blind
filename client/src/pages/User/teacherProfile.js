import { useState,useEffect } from 'react';



function TeacherProfile(props,key) {
    const [role,setRole] = useState('')
    
    return(
        <div>
            <h2>your owned course</h2>
            <div>{props.owned_courses.map(course=>
                    <><div>{course.coursename}</div>
                    <div>{course.followers.map(user => <div>{user.username} {user.score} status:{`${user.status}`}</div>)}




                </div></>
                
                
                
                )}
            
            
            </div>
        
        </div>
    )
}


export default TeacherProfile