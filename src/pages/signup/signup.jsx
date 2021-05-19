import react from 'react'
import '../global-login-style.css'

import Doctorimg from '../../image/Doctor.svg'
import Patientimg from '../../image/Patient.svg'
import { withRouter ,Link} from 'react-router-dom';

class SignUp extends react.Component{
    constructor(props){
        super(props)
        this.state={
            name:'',
            email: '',
            password: '',
            copassword: '',
            is_doctor: false,
            error:false
        }
    }
    
    Submit =(event)=>{ 
        event.preventDefault();
        const {name, email, password, is_doctor}=this.state;
        const data={'name':name,'email':email,'password':password, 'is_doctor':is_doctor};
        console.log(data);
        fetch("https://thediseasefighter.herokuapp.com/register", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
              "Content-Type": "application/json",
          },
      })
          .then((res) => res.json())
          .then((data) => {
              console.log(data);
              if(data.message=='This email exists'){
                this.setState({error:true})
              }
              else if(data.access_token){
                this.props.settoken(data.access_token)
                this.props.setcars('next')
                if(data.is_doctor){
                    this.props.setspec(true)
                }
                else{
                    this.props.setspec(false)
                }
                window.localStorage.setItem('token',data.access_token);
              }
              })
          .catch((err) => {console.log(err)});
       }
    
       handleChange = event => {
        const { value, name } = event.target;
    
        this.setState({ [name]: value });
      };
   render(){
    return(
        <div>
            <div class="form-inner">
                <div class="fristform" id="main">
                    <div class="slide-controls">
                        <input type="radio" name="slide" id="patiant" value="patiant" />
                        <input type="radio" name="slide" id="doctor" value="doctor" />
                        <label for="patiant" class="slide patiant" onClick={()=>this.setState({is_doctor: false})}>
                            <img src={Patientimg} class="fr" alt='patient img' />
                            <span>patiant</span></label>
                        <label for="doctor" class="slide doctor" onClick={()=>this.setState({is_doctor: true})}>
                            <img src={Doctorimg} class="fr" alt='doctor img' />
                            <span>doctor</span></label>
                        <div class="slider-tab">
                        </div>
                    </div>
                    <form onSubmit={this.Submit}>
                        <label>Name</label>
                        <input type="text" name='name' value={this.state.name} onChange={this.handleChange} required/>

                        <label>Email Address</label>
                        <input type="email" name='email' value={this.state.email} onChange={this.handleChange} required/>
                    
                        <label>Password</label>
                        <input type="password" name="password"  value={this.state.password} onChange={this.handleChange} required/>

                        <label>Confirm Password</label>
                        <input type="password" name="copassword"  value={this.state.copassword} onChange={this.handleChange} required/>
                    
                        <input type="submit" value="Next"/>
                        </form>
                        {this.state.error?(<div class="error">
                        This Email Address Already Exists Please Choose a Different One Or Login
                        </div>):(null)}
                        <div class="signin-link">
                            Have an account?<Link to='/login'>SIGN IN</Link>
                        </div>
                    </div>
            </div>
        </div>
    )
   }
}
export default withRouter(SignUp);