import react from 'react'
import './login.css'
import logoimg from '../../image/logo.png'
import googleimg from '../../image/google.png'
import facebookimg from '../../image/facebook.png'
import twitterimg from '../../image/twitter.svg'
import { withRouter ,Link} from 'react-router-dom';

class Login extends react.Component{
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: '',
            error:false
        }
    }
    
    Submit =(event)=>{ 
        event.preventDefault();
        const {email, password}=this.state;
        const data={'email':email,'password':password};
        console.log(data);
        fetch("https://thediseasefighter.herokuapp.com/login", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
              "Content-Type": "application/json",
          },
      })
          .then((res) => res.json())
          .then((data) => {
              console.log(data);
              if(data.is_doctor===true){
                window.localStorage.setItem('doctor',true)
              }
              if(data.access_token){
                window.localStorage.setItem('token',data.access_token)
                this.props.history.push('/home')
              }
              else{
                this.setState({error:true})
              }
              })
          .catch((err) => {console.log(err)});
       }
    
       handleChange = event => {
        const { value, name } = event.target;
    
        this.setState({ [name]: value });
      };
   render(){
       const state = this.state;
    return(
        <div>
        <div className="background">
        </div>
        <div className="signin">
                <div className="logo">
                    <Link to='/'>
                    <img src={logoimg} alt="logo"/>
                    </Link>
                </div>
                <div className='container2'>
                     <div>
                        <h2>Welcome Back!</h2>

                        <form onSubmit={this.Submit}>
                        <label>Email Address</label>
                        <input type="email" name='email' value={this.state.email} onChange={this.handleChange} required/>
                    
                        <label>Password</label>
                        <input type="password" name="password"  value={this.state.password} onChange={this.handleChange} required/>
                    
                        <input type="submit" value="Sign In"/>
                        </form>
                        {this.state.error?(<p className='error'>login again</p>):(null)}
                    </div>
                    <p>or login with</p>
                    <div className="account-logo">
                        <img src={googleimg} alt="google"/>
                        <img src={facebookimg} alt="facebook"/>
                        <img src={twitterimg} alt="twitter"/>
                    </div>
                    <p>Don't have an account? <Link to="/signup">SIGN UP</Link></p>
                </div>
            </div>
        </div>
    )
   }
}
export default withRouter(Login);