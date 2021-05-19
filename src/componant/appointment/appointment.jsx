import react from 'react';
import './appointment.css'
import Doctor from '../../image/Doctor.png'
const Appointment =({name,day,date,time,...props})=>{
    return(
        <div className='appointment-componant'>
            <img src={Doctor} alt='doctor-img'/>
            <div className='appointment-data'>
                <h3>{name}</h3>
                <p>{day},{date},{time}</p>
            </div>
            <div className='icon'>
            <i class="fa fa-ellipsis-v"></i>
            </div>
            
        </div>
    )
}
export default Appointment