import react from 'react'
import './right.css'
import TopDoctor from '../top-doctor/top-doctor'
class Right extends react.Component{
    constructor(props){
        super(props)
        this.state={
            top_doctors:[],
            all_doctors:[]
        }
    }
    componentDidMount() {
        fetch("https://thediseasefighter.herokuapp.com/doctors/top", {
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
                        this.setState({top_doctors:data.top_doctors})
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
    return(
        
        <div className='right'>
            <div className='top-doctor'>
                {this.props.cat?
                (<div>
            <h3>Top Doctors</h3>
            {this.state.top_doctors.map((doctor)=>(<TopDoctor key={doctor.id} {...doctor}/>))}
            </div>)
            :(<div>
            <h3>All Doctors</h3>
            {this.state.all_doctors.map((doctor)=>(<TopDoctor key={doctor.id} {...doctor}/>))}
            </div>)}
             
            </div>
        </div>
    
    )
   }
}
export default Right;