import "../css/help_center.css"
import Navbar1 from '../components/Navbar'
import { useState,useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';


function HelpCenter() {

    useEffect(() => {
        document.title = 'Help Center page';
      }, []);

    window.addEventListener('load', (event) => {
      
        if( localStorage.getItem("lang") === "undefined"){

            localStorage.setItem("lang","thai")

        }else if(localStorage.getItem("lang") === "english"){

            localStorage.setItem("lang","thai")
        }
      
    });

    return(
        <div>
            <Navbar1/>
            <div className='box_hct'>
                <div className='inner_box_hct'>
                    <main id="main-content">

                    <Card style={{ width: '18rem' }} className='note' bg="light" text="dark">
                    <Card.Img variant="top" width="200" height="200" src={`https://www.thaifranchisecenter.com/links/images/web_link_707.gif`} 
                    alt='image1' />
                    <Card.Body >
                    <Card.Title tabIndex={0} style={{fontWeight:"bold"}}>มูลนิธิช่วยคนตาบอดแห่งประเทศไทย</Card.Title>
                    <Button variant="primary" href={`https://www.blind.or.th/`}>View</Button>
                    </Card.Body>
                    </Card>


                    <Card style={{ width: '18rem' }} className='note' bg="light" text="dark">
                    <Card.Img variant="top" width="200" height="200" src={`https://www.blind.or.th/img/upload_centrenews/f67d409119aab4eb9f010dee0707c1ce.png`} 
                    alt='image1' />
                    <Card.Body >
                    <Card.Title tabIndex={0} style={{fontWeight:"bold"}}>โรงเรียนสอนคนตาบอดกรุงเทพ</Card.Title>
                    <Button variant="primary" href={`https://web.facebook.com/โรงเรียนสอนคนตาบอดกรุงเทพ-The-Bangkok-School-for-The-blind-1744499319000439/`}>View</Button>
                    </Card.Body>
                    </Card>


                    <Card style={{ width: '18rem' }} className='note' bg="light" text="dark">
                    <Card.Img variant="top" width="200" height="200" src={`https://www.blind.or.th/img/centre_cover/d7a9b68db811fd0c7e204918cfe2134e.jpg`}
                    alt='image1' />
                    <Card.Body >
                    <Card.Title tabIndex={0} style={{fontWeight:"bold"}}>ศูนย์พัฒนาอาชีพคนตาบอด</Card.Title>
                    <Button variant="primary" href={`https://web.facebook.com/lhfortheblind/?locale=th_TH&_rdc=1&_rdr`}>View</Button>
                    </Card.Body>
                    </Card>


                    <Card style={{ width: '18rem' }} className='note' bg="light" text="dark">
                    <Card.Img variant="top" width="200" height="200" src={`https://i.ytimg.com/vi/Jao3s_CwdRU/maxresdefault.jpg`}
                    alt='image1' />
                    <Card.Body >
                    <Card.Title tabIndex={0} style={{fontWeight:"bold"}}>สอนติดตั้งและใช้งานNVDA</Card.Title>
                    <Button variant="primary" href="/helpcenter/video">View</Button>
                    </Card.Body>
                    </Card>


                    </main>
                </div>
            </div>

        </div>
        )

}

export default HelpCenter;