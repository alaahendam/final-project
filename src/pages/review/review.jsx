import {React,useState} from 'react'
import {useLocation,useHistory} from 'react-router-dom'
import './review.css'
import Header from '../../componant/header/header'
import  Menu  from '../../componant/menu/menu'
import '../../componant/container/container.css'
import Doc from '../../image/Doctor.png'

const Review =()=>{
    const location =useLocation()
    const history=useHistory()
    const [comment,setcomment]=useState('')
    const [stars,setstars]= useState(0)
    var id=null
    if(location.state){
        id=parseInt(location.state.id)
    }
    var index=0
    if(stars){
        index=stars
    }
    let list=[]
    for (let i=1; i<=5;i++) {
        if(i<=index){
            list.push(<i className="fa fa-star rating" onClick={()=>setstars(i)}></i>)
        }
        else{
            list.push(<i className="fa fa-star" onClick={()=>setstars(i)}></i>)
        }
      }
    const addReview=()=>{
        fetch(`https://thediseasefighter.herokuapp.com/sessions/${id}/reviews`, {
          method: "POST",
          body: JSON.stringify({
            "comment":comment,
            "stars":stars
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
              console.log(data);
              if(data.success){
                history.push('/home')
              }
              
              })
          .catch((err) => {console.log(err)});
    }
    return(
        <div>
            <Header />
            <Menu />
            <div className='container-componant'>
                <div className='review'>
                    <img src={Doc} alt="Doctor image" />
                <div className='row'>
                {list}
                </div>
                <textarea className='review-comment' placeholder='Leave Your Comment Here'/>
                <button className='btn' onClick={addReview}>Save Your Review</button>
                </div>
                
            </div>
        </div>
    )
}

export default Review