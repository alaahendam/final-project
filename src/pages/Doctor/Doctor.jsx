import react from 'react'
import '../../componant/global-Home-Doctor.css'
import '../../componant/container/container.css'
import Header from '../../componant/header/header'
import  Menu  from '../../componant/menu/menu'
import SessionData from '../../componant/session-data/session-data'

const Doctor = ()=>{
    return(   
        <div className='Home-Doctor'>
            <Header />
            <Menu />
            <SessionData />
        </div>
    
    )
}
export default Doctor;