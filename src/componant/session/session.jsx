import {react,useState} from 'react'
import ReactDOM from 'react-dom';
import './session.css'
import Doctor from '../../image/Doctor.png'
import BookingInfo from '../booking-info/booking-info'
const Session = ({setState,all_doctors,id,about_flag,favlist})=>{
    const data=all_doctors.filter((obj)=>{return obj.id === id})
    if(data[0]){
        var index=data[0].reviews.rates
        var list=[]
        for (let i=1; i<=5;i++) {
            if(i<=index){
                list.push(<i className="fa fa-star rating"></i>)
            }
            else{
                list.push(<i className="fa fa-star"></i>)
            }
        }
    }
    const Addfav=()=>{
        fetch(`https://thediseasefighter.herokuapp.com/doctors/${id}/favorite`, {
          method: "POST",
          body: JSON.stringify({
            "is_in_favorite_list":true
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
              console.log(data);
              
              })
          .catch((err) => {console.log(err)});
          
    }
    
    return(
        <div className='session'>
            {
                data[0]?(
                    about_flag?(
                        <div className='about-data'>
                        <div className='center'>
                        <img src={Doctor} alt='doctor avatar'/>
                        <h3>DR.{data[0].name}</h3>
                        <p>{!data[0].specialization?(null):(data[0].specialization.name)}</p>
                        <p>{data[0].clinic_location}</p>
                        </div>
                        <div className='about-data2'>
                        <div className='ratinglist'>{list}</div>
                        <div className='about-data3'>
                        <h3>About</h3>
                        <p>{data[0].about}</p>
                        </div>
                        <div className='location'>
                        <i class="fa fa-street-view"></i><p>{!data[0].specialization?(null):(data[0].specialization.name)},{data[0].clinic_location}</p>
                        </div>
                        {data[0].available_dates.map((date)=>(
                            <div className='available_dates'>
                            <i class="fa fa-history"></i>
                            <p>{date.day},{date.start_time} -{date.end_time}</p>
                            </div>
                        ))}
                        {favlist.includes(id)?(
                            <div>
                            <div className='fav-icon'>
                                <i class="fa fa-heart" onClick={()=>Addfav()}></i>
                            </div>
                            <button className='btn' onClick={()=>setState({about_flag:false})}>Book Appointment</button>
                            </div>
                        ):(
                            <div>
                            <div className='heart-icon'>
                                <i class="fa fa-heart" onClick={()=>Addfav()}></i>
                            </div>
                            <button className='btn' onClick={()=>setState({about_flag:false})}>Book Appointment</button>
                            </div>
                            
                            )}
                            
                    </div>
                    </div>):(<BookingInfo id={id}/>)
                ):(null)
            }
            
        </div>
    )
}
export default Session;