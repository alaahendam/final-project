import {react,useState} from 'react'
import {Link} from 'react-router-dom'
import SignUp from './signup'
import SignUpInfo from './signup-info'
import logoimg from '../../image/logo.png'

const Register =()=>{
    const [token, settoken] = useState('');
    const [next, setcars] = useState('def');
    const [spec, setspec] = useState(false);
    const [color, setcolor] = useState({'first':'#61C5F7','second':''});


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
                <div className='container'>
                     <div>
                     {token==''||next=='def'?(<SignUp settoken={settoken} setcars={setcars} setspec={setspec}/>)
                     :(<SignUpInfo spec={spec}/>)}
                    </div>
                    <section class="carousel">

                <aside class="carousel__navigation">
                    <ol class="carousel__navigation-list">
                        <li class="carousel__navigation-item">
                            <button class="carousel__navigation-button" style={{backgroundColor:color.first}}  onClick={()=>(setcars('def'),setcolor({'first':'#61C5F7','second':''}))}></button>
                        </li>
                        <li class="carousel__navigation-item">
                            <button class="carousel__navigat-button" id="dot" style={{backgroundColor:color.second}} onClick={()=>(setcars('next'),setcolor({'first':'','second':'#61C5F7'}))}></button>
                        </li>
                    </ol>
                </aside>
            </section>
                
                </div>
            </div>
            
                
        </div>
    )
}
export default Register