import {react,useState} from 'react'
import './updateDate.css'
const UpdateDate = ({day,end_time, id, start_time,setState})=>{
    const [active,setActive]=useState(false)
    const Del=(i)=>{
     fetch(`https://thediseasefighter.herokuapp.com/doctors/dates/${id}`, {
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
             setState({activeDates:false})
             setState({activeDates:true})
             })
         .catch((err) => {console.log(err)});
}
        return(
            <div className='updateDate'>
                <div className='available_dates'>
                    <div className='row'>
                    <i class="fa fa-history"></i>
                    <p>{day},{start_time} -{end_time}</p>
                    <div className='updateicon'>
                        {active?(
                            <div className='delete'>
                                <h3 onClick={(id)=>Del(id)}>Delete</h3>
                            </div>
                        ):(
                            null
                        )}
                    
                    <i class="fa fa-ellipsis-v" onClick={()=>setActive(!active)}></i>
                    </div>
                    </div>
                    </div>
            </div>
        )

}
export default UpdateDate;