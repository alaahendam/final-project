import react from 'react'
import './App.css';
import { Switch , Route , Redirect ,withRouter,useHistory } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/login/login'
import Register from './pages/signup/Register'
import Artboard from './pages/artboard/artboard'
import Setting from './pages/setting/setting'
import Doctor from './pages/Doctor/Doctor'
import PrivateRoute from './componant/PrivateRoute'
import Appointment from './pages/Appointment/appointment';
const App = ()=>{
  const history =useHistory();
  const logout=()=>{
    history.push('/')
    window.localStorage.clear()
  }
     return(
      
       <div>
         <Switch>
           <Route exact path='/' component={Home} />
           <Route exact path='/login' render={()=>(
             window.localStorage.getItem('token')?(
               history.goBack(),
               alert('You Already Login')
             ):(<Login />)
           )} />
           <Route exact path='/signup' render={()=>(
             window.localStorage.getItem('token')?(
               history.goBack(),
               alert('Logout First')
             ):(<Register />)
           )} />
           <PrivateRoute exact path='/home' component={Artboard} />
           <PrivateRoute exact path='/doctor' component={Doctor} />
           <PrivateRoute exact path='/logout' component={logout} />
           <PrivateRoute exact path='/setting' component={Setting} />
           <PrivateRoute path='/appointment' component={Appointment} />
         </Switch>
       </div>
     )
   }

export default App;
