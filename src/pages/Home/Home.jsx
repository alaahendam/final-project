import {React} from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import logoimg from '../../image/logo.png'
import Doctorimg from '../../image/Doctor.png'
const Home=()=>{
    return(
        <div className="Home">
        <div className="container">
            <nav>
                <div className="logo">
                    <img src={logoimg} alt="logo"/>
                </div>
                <div className="link">
                    <Link to="/home">Home</Link>
                    <Link to="#">Services</Link>
                    <Link to="#">About Us</Link>
                    <Link to="#">News</Link>
                </div>
                <div className="login">
                    <Link to="/login" className="btn">Log In</Link>
                    <Link to="/signup" className="btn">Sign Up</Link>
                </div>
            </nav>
            <div className="homedata">
                <div className="home-info">
                    <h3>Sharing Vitality</h3>
                    <p>Clean design and advanced digital solutions</p>
                    <Link to="/home" className="btn">Get Started</Link>
                </div>
                <div className="home-img">
                    <img src={Doctorimg} alt="doctor"/>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Home