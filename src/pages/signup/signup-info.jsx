import react from 'react'
import '../global-login-style.css'
import logoimg from '../../image/logo.png'
import Dates from '../../componant/Date/Date'
import { withRouter ,Link} from 'react-router-dom';

class SignUpInfo extends react.Component{
    constructor(props){
        super(props)
        this.state={
            location:'',
            phone: '',
            gender: '',
            Specialist:'',
            about:'',
            specializations:[],
            activeDates:false
        }
    }
    componentDidMount(){
        fetch("https://thediseasefighter.herokuapp.com/specializations", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data)
                        this.setState({specializations:data.specializations})
                        
                    })
                    .catch((err) => console.log(err));
    }
    
    Submit =(event)=>{ 
        event.preventDefault();
        const {location, phone, gender, Specialist,about}=this.state;
        const data={'location':location,'clinic_location':location,'phone':phone,'gender':gender, 'spec_id':Specialist , 'about':about};
        fetch("https://thediseasefighter.herokuapp.com/user", {
          method: "PATCH",
          body: JSON.stringify(data),
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
              this.props.history.push('/home')
              })
          .catch((err) => {console.log(err)});
       }
    
       handleChange = event => {
        const { value, name } = event.target;
    
        this.setState({ [name]: value });
      };
   render(){
    return(
        <div className='sign-info'>
            {console.log(this.props.spec)}
            <div className="form-inner">
            <div className="otherform" id="second">
                    <div className="Doc">
                        <h2>You're Almost Done!</h2>

                        <form className="doc" onSubmit={this.Submit}>
                            <label>Location</label>
                            <input type="text" name="location" value={this.state.location} onChange={this.handleChange} required/>

                            <label>Phone Number</label>
                            <input type="text" name="phone"value={this.state.phone} onChange={this.handleChange} required/>

                            <label>Gender</label>
                            <select class="Gender" onChange={(e)=>{
                                        this.setState({gender:e.target.value})
                                    }}>
                                         <option value='none' selected disabled hidden>Select the Gender</option>
                                         <option >Male</option>
                                         <option >Female</option>
                                    </select>
                                    <label>About You</label>
                            <input type="text" name="about" value={this.state.about} onChange={this.handleChange} required/>
                            {this.props.spec?(<div><label >Specialist</label>
                                <select class="days" onChange={(e)=>{
                                        const specId = e.target.selectedIndex
                                        this.setState({Specialist:e.target[specId].attributes['data-id'].value})
                                    }}>
                                    <option value='none' selected disabled hidden>Select the specialization</option>
                                    {this.state.specializations.map((date) => {
                                        return(<option data-id={date.id} name={date.name}>{date.name}</option> )
                                    })}
                                </select>
                                <div className='signdate'>
                                    <p className='signdate-p' onClick={()=>this.setState({activeDates:!this.state.activeDates})}>Choose Time You Avalibale</p>
                                    {this.state.activeDates?(
                                        <div className='signdate-data'>
                                            <Dates setState={state => this.setState(state) }/>
                                        </div>
                                    ):(null)}
                                </div>
                                
                                </div>
                            ):(null)}
                            

                            <div className="lastDo" id="lasT">
                                <p>By pressing “Done” you agree to our</p>
                                <a href="#" className="term">terms & conditions</a>
                            </div>
                            <a href="#"><input type="submit" value="Done" /></a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
   }
}
export default withRouter(SignUpInfo);