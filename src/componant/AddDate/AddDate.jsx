import {React,useState} from 'react'
import './AddDate.css'

const AddDate = ({available,date,setState})=>{
    const [start,setStart]=useState('')
    const [end,setEnd]=useState('')
    const [day,Set_day]=useState('')
    const chanagehour=(e,Set_time)=>{
        const { value, name } = e.target;
        if(value.slice(0,2)/12 <=1){
            let date=value+' am'
            Set_time(date)
        }
        if(value.slice(0,2)/12 >1){
            let divdate=value.slice(0,2)%12
            let date=divdate+value.slice(2)+' pm'
            Set_time(date)
        }
    }
    const ChangeDate=()=>{
     fetch("https://thediseasefighter.herokuapp.com/doctors/dates", {
         method: "POST",
         body: JSON.stringify({
            "start_time": `${start}`,
            "end_time": `${end}`,
            "day":`${day}`
            }),
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
             if(data.message==="You have created a new date"){
                setState({activeDates:false})
                setState({activeDates:true})
             }
             })
         .catch((err) => {console.log(err)});
    }
        return(
            <div className='Date'>
                <div className='row'>
                <div>
                    <label>Day</label>
                <select className='Day' onChange={(e)=>Set_day(e.target.value)}>
                    <option value='none' selected disabled hidden>DAY</option>
                    {date.map((date)=>available.includes(date)?(
                        null
                    ):(
                        <option>{date}</option>
                    ))}
                </select>
                </div>
                <div>
                <label>Start Time</label>
                <input type="time" id="appt" name='start_time' required onChange={(e)=>chanagehour(e,setStart)}/>
                </div>
                <div>
                <label>End Time</label>
                <input type="time" id="appt" name='end_time' required onChange={(e)=>chanagehour(e,setEnd)}/>
                </div>
                </div>
                <button className='btn' onClick={ChangeDate}>Save Date</button>
            </div>
        )
    }
export default AddDate;