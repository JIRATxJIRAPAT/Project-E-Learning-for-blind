import { useState,useEffect } from 'react';



function StudentProfile(props,key) {
    
    return(
        <div>
            <h2>your owned course</h2>
            <div>{props.enrolled.map(course=>
                    <><div>{course.coursename}</div>
                    <div>score:{course.score} status:{`${course.status}`}</div>

                    </>
                )}
                
                
                
            
            
            </div>
        
        </div>
    )
}


export default StudentProfile