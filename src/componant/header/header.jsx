import react from 'react'
import '../global-Home-Doctor.css'
import { withRouter ,Link} from 'react-router-dom';
import logoimg from '../../image/logo.png'
import Logout from '../logout/logout'
import Notifi from '../notification/notification'
class Header extends react.Component{
    constructor(props){
        super()
        this.state={
            hiddelogout:true,
            hiddenotifi:true,
            userdata:{}
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
        
                }
    render(){
        const {hiddelogout,hiddenotifi}=this.state;
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
                        <input type="search" placeholder="Search Doctor" />
                  </div>
                  <div className="username row" >
                        <div className="notifi_icon icon" onClick={()=>this.setState({hiddenotifi:!hiddenotifi,hiddelogout:true})}><i className="fa fa-bell"></i>
                        </div>
                        {hiddenotifi?(null):(<Notifi/>)}
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