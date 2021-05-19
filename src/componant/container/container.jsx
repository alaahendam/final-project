import {react,useState} from 'react'
import './container.css'
import { withRouter ,Link} from 'react-router-dom';
import Left from '../leftsec/left'
import Right from '../rightsec/right';
import DoctorArtboard from '../../pages/Doctor-artboard/doctor-artboard'


const Container =({is_doctor})=>{
    const [cat,setcat]=useState(true)
    return(
                <div>
                     {
                     !window.localStorage.getItem("doctor")?(
                         <div className='container-componant'>
                             <Left setcat={setcat}/>
                             <Right cat={cat}/>
                         </div>
                     ):(
                        <div className='container-componant'>
                            <DoctorArtboard/>
                        </div>
                     )
                    }
                 </div>
                 
    )

}
export default Container;