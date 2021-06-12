import React from 'react'
import {withRouter,Link} from 'react-router-dom'
import './doctor-artboard.css'
import Ai from '../../image/AI.png'
import Doctors from '../../image/Doctors.png'
class DoctorArtboard extends React.Component{
    constructor(){
        super()
        this.state={
            data:[],
            next_data:[],
            currapp:'appointment-activate',
            nextapp:'',
            prevapp:'',
            name:'',
            prev:false
        }
    }
    componentDidMount(){
        fetch("https://thediseasefighter.herokuapp.com/sessions", {
            method: "GET",
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
                this.setState({data:data,next_data:data.current_appointments})
            })
            .catch((err) => console.log(err));
        fetch("https://thediseasefighter.herokuapp.com/user", {
            method: "GET",
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
                this.setState({name:data.current_user.name})

            })
            .catch((err) => console.log(err));
    }
    render(){
        return(
            <div className='DoctorArtboard'>
                {console.log(this.state.next_data)}
                <div className='DoctorArtboard-header'>
                    <div className='left2'>
                        <div>
                            <h3>Hello! {this.state.name}</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                             Culpa, quidem quibusdam!  </p>
                             <Link to='/appointment'>Show Meeting</Link>
                        </div>
                        <div>
                            <img src={Doctors} alt="Doctors" />
                        </div>
                    </div>
                    <div className='right2'>
                    <div>
                        <h3>Hello! {this.state.name}</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Culpa, quidem quibusdam!  </p>
                            <a href='#'>Using Model</a>
                        </div>
                        <div>
                            <img src={Ai} alt="Model AI" />
                        </div>
                    </div>
                </div>
                <div className='appointment'>
                    <div className='bg2'>
                        <div className='appointment-header'>
                            <h3>My Appointment</h3>
                            <p className={`${this.state.currapp}`} onClick={()=>this.setState({currapp:'appointment-activate',nextapp:'',prevapp:'',next_data:this.state.data.current_appointments,prev:false})}>Today Appointment</p>
                            <p className={`${this.state.nextapp}`} onClick={()=>this.setState({currapp:'',nextapp:'appointment-activate',prevapp:'',next_data:this.state.data.future_appointments,prev:false})}>Future Appointment</p>
                            <p className={`${this.state.prevapp}`} onClick={()=>this.setState({currapp:'',nextapp:'',prevapp:'appointment-activate',next_data:this.state.data.previous_appointments,prev:true})}>Previous Appointment</p>
                        </div>
                                <table>
                            <tr>
                                <td className='appoint-img'></td>
                            <td className='patient-name'>Patient Name</td>
                                <td>Date</td>
                                <td>Time</td>
                                <td className='start-meet'></td>
                            </tr>
                            {this.state.next_data?(
                                this.state.next_data.map((appoint)=>(
                                    <tr>
                                    <td><img src={appoint.patient_avatar} alt="patient" /></td>
                                    <td>{appoint.name}</td>
                                    <td>{appoint.date}</td>
                                    <td>{appoint.time}</td>
                                    <td><button className='btn' onClick={()=>this.props.history.replace({pathname:`appointment/${appoint.id}`,state:{prev:this.state.prev}})}>Show Meeting</button></td>
                                </tr>
                                ))
                            ):(null)}
                            
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(DoctorArtboard)