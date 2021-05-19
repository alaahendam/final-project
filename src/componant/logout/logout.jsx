import react from 'react'
import {useHistory} from 'react-router-dom'
import '../global-Home-Doctor.css'
import './logout.css';
import Doctor from '../../image/Doctor.png'

const Logout =({avatar ,name})=>{
    const history=useHistory()
    const logout=()=>{
        window.localStorage.clear();
        history.push('/login')
    }
    console.log(window.localStorage.getItem('token'))
    return(
        <div className="profile_logout">
            <div className='row'>
                <img src={avatar} alt='user avatar'/>
                <div className='logout-data'>
                <h4>{name}</h4>
                <p>see your profile</p>
                </div>
            </div>
            <div className='logout-icon' onClick={logout}>
            <i class="fa fa-arrow-left"> Log Out</i>
            </div>
        </div>
    )
}
export default Logout