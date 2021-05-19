import react from 'react'
import LeftDoctor from '../left-doctor/leftdoctor'
import Session from '../session/session'
import '../container/container.css'
class SessionData extends react.Component{
    constructor(props){
        super(props)
        this.state={
            all_doctors:[],
            id:1,
            about_flag:true,
            favlist:[]
        }
    }
    componentDidMount() {
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

        fetch("https://thediseasefighter.herokuapp.com/favorites", {
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
            let list=[]
            data.doctors.map((doctor)=>{
                list.push(doctor.id)
            })
            this.setState({favlist:list})
        })
        .catch((err) => console.log(err));
                }
   render(){
    return(
        <div className='container-componant'>
            <LeftDoctor all_doctors={this.state.all_doctors} setState={state => this.setState(state)}/>
            <Session {...this.state} setState={state => this.setState(state)}/>
        </div>
    )
   }
}
export default SessionData;