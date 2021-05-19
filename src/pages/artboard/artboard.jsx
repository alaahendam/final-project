import react from 'react'
import '../../componant/global-Home-Doctor.css'
import { withRouter ,Link} from 'react-router-dom';
import Header from '../../componant/header/header'
import  Menu  from '../../componant/menu/menu'
import Container from '../../componant/container/container'
const Artboard = ()=>{
    return(   
        <div className='Home-Doctor'>
            <Header />
            <Menu />
            <Container />
        </div>
    )
}
export default Artboard;