import react from 'react'
import {withRouter} from 'react-router-dom'
import '../global-Home-Doctor.css'
import './notifi.css'
import Doctor from '../../image/Doctor.png'
class Notifi extends react.Component{
    constructor(props){
        super(props)
        this.state={
            notifidata:this.props.notifidata
        }
    }
                deleteTask(id) {
                    const remain_data=this.state.notifidata.filter((obj)=>{return obj.session_id !== id})
                    this.setState({notifidata:remain_data});
                    fetch(`https://thediseasefighter.herokuapp.com/notifications/${id}`, {
                                method: "PATCH",
                                body: JSON.stringify({
                                    "type": "delete"
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
                                    if(data.message==='You have delete the notification'){
                                        let num =this.props.num
                                        if(num===1 || num ==null){
                                            num=null
                                        }
                                        else{
                                            num -=1
                                        }
                                        this.props.setState({num:num})
                                        this.props.setState({notifidata:remain_data}) 
                                    }
                                       
                                })
                                .catch((err) => console.log(err));
                                
                    }
                    seen_notifi(id){
                        fetch(`https://thediseasefighter.herokuapp.com/notifications/${id}`, {
                                method: "PATCH",
                                body: JSON.stringify({
                                    "type": "update"
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
                                    this.props.history.replace({pathname:`/review`,state: { id: id}})
                                       
                                })
                                .catch((err) => console.log(err));
                    }
    render(){
        const unseen_data=this.state.notifidata.filter((obj)=>{return obj.seen == false})
        const seen_data=this.state.notifidata.filter((obj)=>{return obj.seen == true})
        return(
            <div className="notifi_data">
                {console.log(this.state.notifidata)}
                <h3>Notification</h3>
                <div>
                {this.state.notifidata.length?(
                    <div className='overflow-notifi'>
                        <p className='notifi-title'>NEW</p>
                        {unseen_data.map((notifi)=>(
                        <div className='appointment-componant' onClick={()=>this.seen_notifi(notifi.session_id)}>
                        <img src={Doctor} alt='doctor-img'/>
                        <div className='appointment-data'>
                            <p>{notifi.doctor_name}</p>
                            <p>{notifi.time}</p>
                        </div>
                        <div className='icon' onClick={()=>this.deleteTask(notifi.session_id)}>
                        <i class="fa fa-times"></i>
                        </div>
                    </div>
                    ))}
                    <p className='notifi-title'>Earlier</p>
                        {seen_data.map((notifi)=>(
                        <div className='appointment-componant active'>
                        <img src={Doctor} alt='doctor-img'/>
                        <div className='appointment-data'>
                            <p>{notifi.doctor_name}</p>
                            <p>{notifi.time}</p>
                        </div>
                        <div className='icon' onClick={()=>this.deleteTask(notifi.session_id)}>
                        <i class="fa fa-times"></i>
                        </div>
                    </div>
                    ))}
                    </div>
                ):(<p>No Notification Here</p>)}
                </div>
            </div>
        )
    }
    
}
export default withRouter(Notifi);