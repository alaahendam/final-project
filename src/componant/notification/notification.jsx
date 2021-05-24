import react from 'react'
import '../global-Home-Doctor.css'
import './notifi.css'
import Doctor from '../../image/Doctor.png'
class Notifi extends react.Component{
    constructor(props){
        super()
        this.state={
            notifidata:[],
            hiddenotifi:true
        }
    }
    componentDidMount() {
        fetch("https://thediseasefighter.herokuapp.com/notifications", {
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
                        this.setState({notifidata:data.notifications})
                        console.log(data)
                        
                    })
                    .catch((err) => console.log(err));
        
                }
                deleteTask(id) {
                    fetch(`https://thediseasefighter.herokuapp.com/notifications/${id}`, {
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
                                    console.log(data);
                                    this.setState(prevState => {
                                        const tasks = prevState.notifidata.filter(notifi => notifi.id !== id);
                                        return { tasks };
                                    });    
                                })
                                .catch((err) => console.log(err));
                    }

    render(){
        return(
            <div className="notifi_data">
                <h3>Notification</h3>
                {this.state.notifidata?(
                    this.state.notifidata.map((notifi)=>(
                        <div className='appointment-componant'>
                        <img src={Doctor} alt='doctor-img'/>
                        <div className='appointment-data'>
                            <p>{notifi.doctor_name}</p>
                            <p>{notifi.time}</p>
                        </div>
                        <div className='icon' onClick={()=>this.deleteTask(notifi.id)}>
                        <i class="fa fa-times"></i>
                        </div>
                    </div>
                    ))
                ):(<p>No Notification Here</p>)}
                
            </div>
        )
    }
    
}
export default Notifi;