import React from 'react'
import { withRouter} from 'react-router-dom'
import'./booking-info.css'
import dates from'./data'
import bookingimg from '../../image/booking.png'
class BookingInfo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            dates:dates,
            day:'',
            time:'',
            name:'',
            gender:'',
            phone:'',
            medicines:'',
            comment:'',
            day_id:null,
            period_id:null,
            booking_success:false
        }
    }
    componentDidMount(){
        fetch(`https://thediseasefighter.herokuapp.com/doctors/${this.props.id}/dates`, {
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
              this.setState({dates:data})
              })
          .catch((err) => {console.log(err)});
    }
    Booking=()=>{
        const {day,time,name,gender,phone,medicines,comment,period_id}=this.state
        var root=null
        var method=null
        var previous_period_id=period_id
        var data={
                    "day":day,
                    "time":time,
                    "am_pm":time.slice(-2),
                    "name":name,
                    "gender":gender,
                    "phone":phone,
                    "comment":comment,
                    "period_id":period_id,
                    "previous_period_id":previous_period_id,
                    error:''
        }
        if (this.props.location.state) {
            if(this.props.location.state.update){
                root=`https://thediseasefighter.herokuapp.com/sessions/${this.props.location.state.session_id}`
                method="PATCH"
                previous_period_id=this.props.location.state.period_id
                
            }
            else{
                root=`https://thediseasefighter.herokuapp.com/doctors/${this.props.id}/sessions`
                method="POST"
                data["medicines"]=medicines
            }
        }
        console.log(data)
        fetch(`${root}`, {
                    method: `${method}`,
                    body:JSON.stringify(data),
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem(
                            "token"
                        )}`,
                        "Content-Type": "application/json",
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        this.setState({booking_success:true})
                        if(data.success){
                            this.setState({error:'Reservation Was Successful'})
                        }
                        else{
                            this.setState({error:'Reservation Was Failed'})
                            alert('Reservation Was Failed')
                            this.setState({booking_success:false})
                        }
                        
                    })
                    .catch((err) => console.log(err));
    }
    availableDates={}
    render(){
        return(
            <div className='booking-info'>
                {!this.state.booking_success?(
                    this.state.dates.dates?(
                        <div>
                        <div className='booking-header'>
                            <h3>Booking Information</h3>
                            <p>fill your contact details</p>
                        </div>
                
                <label>Date</label>
                <select class="days" onChange={(e)=>{
                    const dayId = e.target.selectedIndex
                    this.setState({day_id:e.target[dayId].attributes['data-id'].value})
                    this.setState({day:e.target.value})
                }}>
                <option value='none' selected disabled hidden>Select the day</option>
                {this.state.dates.dates.map((date) => {
                    this.availableDates[date.id] = { ...date.available_dates }
                    return(<option data-id={date.id} name={date.day}>{date.day}</option> )
                })}
            </select>
            <label>Time</label>
            <select class="time" onChange={(e)=>{
                    const period_id = e.target.selectedIndex
                    this.setState({period_id:e.target[period_id].attributes['data-id'].value})
                    this.setState({time:e.target.value})
                }}>
                <option value='none' selected disabled hidden>Select the time</option>:
                {this.availableDates?(this.state.day_id?(
                    Object.values(this.availableDates[this.state.day_id]).map((date)=>(
                        !date.is_available?(
                            <option data-id={date.id} name={date.time}>{date.time}</option>
                        ):(console.log(false))
                ))
                ):(null)):(null)}
            </select>
            <label>Name</label>
            <input type='text' className='text name' placeholder='Name' onChange={(e)=>{this.setState({name:e.target.value})}} required/>
            <div className='row'>
                <div>
                    <label htmlFor="gender">Gender</label>
                    <select className='gender' onChange={(e)=>{this.setState({gender:e.target.value})}}>
                        <option value='none' selected disabled hidden>Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                </div>
                <div>
                <label htmlFor="Phone">Phone</label>
                <input type='text' className='text phone' placeholder='+20012234567' onChange={(e)=>{this.setState({phone:e.target.value})}} required/>
                </div>
                
            </div>
            {!this.props.location.state.update?(
                <div>
                <label htmlFor="medicines">Medicines</label>
                <input type='text' className='text name' placeholder='Enter all medicine you take' onChange={(e)=>{this.setState({medicines:e.target.value})}} required/>
                </div>
            ):(null)}
            <label htmlFor="comment">Comment</label>
                <input type='text' className='text comment' placeholder='Enter Your Comment' onChange={(e)=>{this.setState({comment:e.target.value})}}/>
                <button className='btn5' onClick={this.Booking}>Book Appointment</button>
                    </div>
                    ):(null)          
                ):(
                    <div>
                        <img src={bookingimg} alt='booking image'/>
                            <div className='booking-header'>
                            <h3>{this.state.error}</h3>
                        </div>
                    </div>
                )}
                
                
            </div>
        )
    }
    
}
export default withRouter(BookingInfo);