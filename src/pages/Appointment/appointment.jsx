import react from 'react'
import {Route} from 'react-router-dom'
import Header from '../../componant/header/header'
import  Menu  from '../../componant/menu/menu'
import '../../componant/container/container.css'
import './appointment.css'
import EndSession from '../../componant/end-session/endsession'

class Appointment extends react.Component{
    constructor(){
        super()
        this.state={
            data:{}
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
                this.setState({data:data})
            })
            .catch((err) => console.log(err));
    }
    render(){
        return(
            <div>
            <Header />
            <Menu />
            <div className='container-componant'>
                <Route exact path={`${this.props.match.path}`} render={()=>(
                    <EndSession data={this.state.data.current_appointments}/>
                )} />
                <Route exact path={`${this.props.match.path}/:id`} render={()=>(
                    <EndSession data={this.state.data.all_appointments}/>
                )}/>
            </div>
            </div>
        )
    }
}
export default Appointment;