import React from 'react'
import {Route} from 'react-router-dom'
import '../../componant/global-Home-Doctor.css'
import '../../componant/container/container.css'
import Header from '../../componant/header/header'
import  Menu  from '../../componant/menu/menu'
import SessionData from '../../componant/session-data/session-data'

const Doctor = ({match})=>{
    return(   
        <div className='Home-Doctor'>
            <Header />
            <Menu />
            {console.log(match.path)}
            <Route exact path={`${match.path}`} render={()=>(
                    <SessionData/>
                )} />
                <Route path={`${match.path}/:id`} render={()=>(
                    <SessionData />
                )}/>
            
        </div>
    
    )
}
export default Doctor;