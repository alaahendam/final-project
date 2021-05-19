import react from 'react'
import './setting.css'
import '../../componant/container/container.css'
import Header from '../../componant/header/header'
import  Menu  from '../../componant/menu/menu'
class Setting extends react.Component{
    constructor(){
        super()
        this.state={
            activef:'active',
            actives:'',
            about:'',
            phone:'',
            gender:'',
            location:'',
            avatar:null,
            current:'',
            new:'',
            avatarimg:'https://thediseasefighter.herokuapp.com/static/default.png'
        }
    }
    
    componentDidCatch(){
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
              this.setState({about:data.about,location:data.location,phone:data.phone,gender:data.gender})
              })
          .catch((err) => {console.log(err)});
    }
    Submitavatar =()=>{
        console.log(this.state.avatar)
        var data = new FormData()
        data.append('file', this.state.avatar)
        data.append('key', '123')
        console.log(data)
        fetch('https://thediseasefighter.herokuapp.com/avatar', {
          method: 'PATCH',
          body: data,
          headers: {
                          Authorization: `Bearer ${window.localStorage.getItem(
                              "token"
                  )}`
          }
        })
        .then(response => response.json())
        .then(data => {
          console.log(data)
        })
        .catch(error => {
          console.error(error)
        })
    }

    Submit =()=>{ 
        const {location, phone, gender,about}=this.state;
        const data={'location':location,'clinic_location':location,'phone':phone,'gender':gender, 'about':about};
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
              })
          .catch((err) => {console.log(err)});
       }
       changepass=()=>{
           const data={
            current_password:this.state.current,
            new_password:this.state.new
        }
        fetch("https://thediseasefighter.herokuapp.com/password", {
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
                alert(data);
                })
            .catch((err) => {console.log(err)});
       }
       ChangeDate=()=>{

     fetch("https://thediseasefighter.herokuapp.com/doctors/dates", {
         method: "POST",
         body: JSON.stringify({
            "start_time": "01:00 pm",
            "end_time": "011:30 pm",
            "day":"Wednesday"
            }),
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
             })
         .catch((err) => {console.log(err)});
    }
    render(){
        return(
            <div className='setting1'>
                <Header />
                <Menu />
                <div className='container-componant'>
                    <div className='security'>
                        <div onClick={()=>this.setState({activef:'active',actives:''})}><p className={`${this.state.activef}`}>Edit Profile</p></div>
                        <div onClick={()=>this.setState({activef:'',actives:'active'})}><p className={`${this.state.actives}`}>Password & Security</p></div>
                    </div>
                    <div className='setting'>
                        <div className='update-data'>
                            {this.state.activef?(
                                <div>
                                <div className='update-img'>
                                <img src={this.state.avatarimg} className='update-avatar' alt="avatar image" />
                                <label htmlFor="updateimg"><i class="fa fa-camera"></i></label>
                                <input id="updateimg" className='file' type="file" accept="image/*" multiple = "false" onChange={(e)=>(this.setState({avatar:e.target.files[0],avatarimg:URL.createObjectURL(e.target.files[0])}))}/>
                                <button className='btn' onClick={this.Submitavatar}>Upload Image</button>
                            </div>
                            <div>
                            <label>About</label>
                            <input type='text' className='about' placeholder='About' onChange={(e)=>this.setState({about:e.target.value})}/>
                            <label>Phone Number</label>
                            <input type='text' className='text' placeholder='+5353624242' onChange={(e)=>this.setState({phone:e.target.value})}/>
                            <label htmlFor="gender">Gender</label>
                            <select className='gender' onChange={(e)=>{this.setState({gender:e.target.value})}}>
                                <option value='none' selected disabled hidden>Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                            <label htmlFor="gender">Location</label>
                            <input type='text' className='text' placeholder='Mansoura' onChange={(e)=>this.setState({location:e.target.value})}/>
                            <button className='btn' onClick={this.Submit}>Save</button>
                            </div>
                                </div>
                            ):(
                                <div className='change-pass'>
                                    <label htmlFor="gender">Current Password</label>
                                    <input type='password' className='text' onChange={(e)=>this.setState({current:e.target.value})}/>
                                    <label htmlFor="gender">New Password</label>
                                    <input type='password' className='text' onChange={(e)=>this.setState({new:e.target.value})}/>
                                    <button className='btn' onClick={this.ChangeDate}>Save Change</button>
                                    <div>
                                    <select className='gender' onChange={(e)=>{this.setState({gender:e.target.value})}}>
                                        <option value='none' selected disabled hidden>DAY</option>
                                        <option>Saturday</option>
                                        <option>Sunday</option>
                                        <option>Monday</option>
                                        <option>Tuesday</option>
                                        <option>Wednesday</option>
                                        <option>Thursday</option>
                                        <option>Friday</option>
                                    </select>
                                    </div>
                                </div>
                            )}
                            
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Setting;