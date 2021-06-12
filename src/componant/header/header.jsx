import React from 'react'
import '../global-Home-Doctor.css'
import './header.css'
import { withRouter ,Link} from 'react-router-dom';
import logoimg from '../../image/logo.png'
import Logout from '../logout/logout'
import Notifi from '../notification/notification'
import TopDoctor from '../top-doctor/top-doctor'
class Header extends React.Component{
    constructor(props){
        super(props)
        this.state={
            hiddelogout:true,
            hiddenotifi:true,
            all_doctors:[],
            userdata:{},
            notifidata:[],
            search:'',
            num:null
        }
    }
    componentDidMount() {
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
                        this.setState({userdata:data.current_user})
                        
                    })
                    .catch((err) => console.log(err));
                    //notifications fet
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
                console.log(data)
                let num=0
                data.notifications.map((notifi)=>{
                    if(!notifi.seen){
                        num +=1
                    }
                })
                if(num===0){
                    num=null
                }
                this.setState({notifidata:data.notifications,num:num})
                console.log(data)
                
            })
            .catch((err) => console.log(err));
        

        fetch("https://thediseasefighter.herokuapp.com/doctors", {
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
                this.setState({all_doctors:data.doctors})
            })
            .catch((err) => console.log(err));
        
                }
    render(){
        const {hiddelogout,hiddenotifi,all_doctors,search}=this.state;
        const filterdoctor = all_doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(search.toLowerCase())
        )
        
        console.log(filterdoctor)
        return(
            <div className='Home-Doctor'>
                <nav>
                    <div className='container'>
                    <div className='row'>
                    <div className='logo'>
                    <Link to='/'><img src={logoimg} alt="logo" /></Link>
                    </div>
                    <div class="search_bar row">
                        <div class="icon"><i class="fa fa-search"></i></div>
                        <input type="search" placeholder="Search Doctor" onChange={(e)=>this.setState({search:e.target.value})}/>
                        {this.state.search?(
                            <div className='search'>
                                {filterdoctor.map((doctor)=>(<TopDoctor key={doctor.id} {...doctor}/>))}
                            </div>
                        ):(null)}
                  </div>
                  <div className="username row" >
                        <div className="notifi_icon icon" onClick={()=>this.setState({hiddenotifi:!hiddenotifi,hiddelogout:true})}><i className="fa fa-bell"><p className='num-notifi'>{this.state.num}</p></i>
                        </div>
                        {hiddenotifi?(null):(<Notifi notifidata={this.state.notifidata} setState={(state)=>this.setState(state)} num={this.state.num}/>)}
                        <div className="row userdata" onClick={()=>this.setState({hiddelogout:!hiddelogout,hiddenotifi:true})}>
                            <img src={this.state.userdata.avatar} alt="user avatar" />
                            <p>{this.state.userdata.name}</p>
                            <div className="icon" ><i className="fa fa-sort-down"></i></div>
                        </div>
                        {hiddelogout?(null):(<Logout {...this.state.userdata}/>)}
            </div>
                    </div>
                    <div>
                    </div>
                    </div>
                </nav>
            </div>
        )
    }
    
}
export default withRouter(Header);