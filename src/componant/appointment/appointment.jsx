import {React,useState} from 'react';
import {useHistory} from 'react-router-dom'
import './appointment.css'
const Appointment =({doctor_name,day,date,time,doctor_avatar,doctor_id,id,period_id,setState,...props})=>{
    const history =useHistory()
    const [hiddeAppoint,set_hiddeAppoint]=useState(true)
    const delete_appoint=()=>{
        fetch(`https://thediseasefighter.herokuapp.com/sessions/${id}`, {
         method: "DELETE",
         headers: {
           Authorization: `Bearer ${window.localStorage.getItem(
               "token"
           )}`,
             "Content-Type": "application/json",
         },
     })
         .then((res) => res.json())
         .then((data) => {
             console.log(data)
             setState({updatesession:false})
             setState({updatesession:true})
             })
         .catch((err) => {console.log(err)});
    }
    return(
        <div className='appointment-componant'>
            <img src={doctor_avatar} alt='doctor-img'/>
            {console.log({...props})}
            <div className='appointment-data'>
                <h3>Dr : {doctor_name}</h3>
                <p>{day},{date},{time}</p>
            </div>
            <div className='icon'>
            {hiddeAppoint?(null):(
                <div className='update-appoint'>
                    <p className='delete'onClick={()=>history.replace({pathname:`/doctor`,state: { id: doctor_id,session_id:id,prev_id:period_id,update:true }})}>Update</p>
                    <p className='delete' onClick={delete_appoint}>Delete</p>
                </div>
            )}
            <i class="fa fa-ellipsis-v" onClick={()=>set_hiddeAppoint(!hiddeAppoint)}></i>
            </div>
            
        </div>
    )
}
export default Appointment