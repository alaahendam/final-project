import react from 'react'
import './left.css'
import Brain from '../../image/Brain.png'
import { withRouter ,Link} from 'react-router-dom';
import specializations from './data'
import Appointment from '../appointment/appointment'

class Left extends react.Component{
    constructor(props){
        super(props)
        this.state={
            spec:[],
            categorie:true,
            specname:'',
            specid:[],
            nextapp:'appointment-activate',
            prevapp:'',
            nextdata:[],
            prevdata:[]
        }
    }
    componentDidMount() {
        fetch("https://thediseasefighter.herokuapp.com/specializations", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        this.setState({spec:data.specializations})
                        
                    })
                    .catch((err) => console.log(err));
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
                this.setState({prevdata:data.previous_appointments,nextdata:data.future_appointments})
            })
            .catch((err) => console.log(err));
    }
   render(){
    return(   
        <div className='left'>
            {this.props.setcat(this.state.categorie)}
            <div className='top-left'>
                {this.state.categorie?(
                    <div>
                    <h3>Categories</h3>
                <div className='categories-img'>
                    {this.state.spec.map((spec)=>(<img src={spec.image} alt={spec.name} onClick={()=>{this.setState({specname:spec.name,categorie:false})}}/>))}
                
                </div> </div>
                ):(<div className='model'> 
                <i class="fa fa-arrow-left" onClick={()=>this.setState({categorie:true})}> GO BACK</i>
                <h3> Diagnosis disease with ML</h3>
                <h4> This is {this.state.specname} Clink</h4>
                </div>)}
                
            </div>
            <div className='bottom-left'>
                <div className='appointment-header'>
                    <h3>My Appointment</h3>
                    <p className={`${this.state.nextapp}`} onClick={()=>this.setState({nextapp:'appointment-activate',prevapp:''})}>Next Appointment</p>
                    <p className={`${this.state.prevapp}`} onClick={()=>this.setState({nextapp:'',prevapp:'appointment-activate'})}>Prevoius Appointment</p>
                </div>
                {this.state.nextdata?(
                    this.state.nextdata.map((app)=> <Appointment key={app.id}{...app}/>)
                ):(
                    this.state.prevdata?(
                        this.state.prevdata.map((app)=> <Appointment key={app.id}{...app}/>)
                    ):(null)
                    
                )}
                
            </div>
        </div>
    
    )
   }
}
export default Left;