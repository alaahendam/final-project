import {react,useState} from 'react'
import '../global-Home-Doctor.css'
import { withRouter ,Link} from 'react-router-dom';

const Menu =()=>{
    const [color,setcolor]=useState({home:'active',doctor:'',fav:'',sett:''})
    return(
        <div className='Home-Doctor fixed'>
            <section className="menu">
            <h3>MENU</h3>
            <ul>
                <li className={`${color.home}`} onClick={()=>setcolor({home:'active',doctor:'',fav:'',sett:''})}><Link to="/home"><i className='fa fa-home'></i>Home</Link></li>
                {window.localStorage.getItem('doctor')?(
                    <div>
                        <li className={`${color.doctor}`} onClick={()=>setcolor({home:'',doctor:'active',fav:'',sett:''})}><Link to="/appointment"><i className='fa fa-user-md'></i>Appointment</Link></li>
                    <li className={`${color.doctor}`} onClick={()=>setcolor({home:'',doctor:'active',fav:'',sett:''})}><Link to="#"><i className='fa fa-star'></i>Model</Link></li>
                    </div>
                ):(
                    <div>
                        <li className={`${color.doctor}`} onClick={()=>setcolor({home:'',doctor:'active',fav:'',sett:''})}><Link to="/doctor"><i className='fa fa-user-md'></i>Doctors</Link></li>
                <li className={`${color.fav}`} onClick={()=>setcolor({home:'',doctor:'',fav:'active',sett:''})}><Link to="#"><i className='fa fa-star'></i>Favourite</Link></li>
                    </div>
                )}
                
                <li className={`${color.sett}`} onClick={()=>setcolor({home:'',doctor:'',fav:'',sett:'active'})}><Link to="/setting"><i className='fa fa-cog'></i>Settings</Link></li>
            </ul>
        </section>
        </div>
    )

}
export default withRouter(Menu);