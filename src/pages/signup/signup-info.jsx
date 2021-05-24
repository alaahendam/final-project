import react from 'react'
import '../global-login-style.css'
import logoimg from '../../image/logo.png'

import { withRouter ,Link} from 'react-router-dom';

class SignUpInfo extends react.Component{
    constructor(props){
        super(props)
        this.state={
            location:'',
            phone: '',
            gender: '',
            Specialist:'',
        }
    }
    
    Submit =(event)=>{ 
        event.preventDefault();
        const {location, phone, gender, Specialist}=this.state;
        const data={'location':location,'clinck_location':location,'phone':phone,'gender':gender, 'spec_id':Specialist};
        console.log(data);
        console.log(window.localStorage.getItem(
            "access_token"
        ))
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
        <div>
            {console.log(this.props.spec)}
            <div className="form-inner">
            <div className="otherform" id="second">
                    <div className="Doc">
                        <h2>You're Almost Done!</h2>

                        <form className="doc" onSubmit={this.Submit}>
                            <label>Location</label>
                            <input type="text" name="location" value={this.state.location} onChange={this.handleChange}/>

                            <label>Phone Number</label>
                            <input type="text" name="phone"value={this.state.phone} onChange={this.handleChange} required/>

                            <label>Gender</label>
                            <input type="text"  name="gender" value={this.state.gender} onChange={this.handleChange} required />
                            {this.props.spec?(<div><label >Specialist</label>
                                <input id="doctori" type="text"  name="Specialist" value={this.state.Specialist} onChange={this.handleChange} required /></div>
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