import React from 'react';
import {useHistory,useLocation,useRouteMatch} from 'react-router-dom'
import './leftalldoctor.css'
const LeftAllDoctor =({name,avatar,id,spec_id,specialization,clinic_location,reviews,about,setState,...doctor})=>{
    const history =useHistory()
    const match =useRouteMatch()
    var index=reviews.rates
    let list=[]
    for (let i=1; i<=5;i++) {
        if(i<=index){
            list.push(<i className="fa fa-star rating"></i>)
        }
        else{
            list.push(<i className="fa fa-star"></i>)
        }
      }
      const SendAbout=(id)=>{
        setState({about_flag:true})
        history.replace({pathname:`${match.url}`,state: { id: id }})

      }
    return(
        
        <div className='alldoctor-componant' onClick={()=>SendAbout(id)}>
            <img src={avatar} alt='doctor-img'/>
            <div className='row'>
            <div className='alldoctor-data'>
            <h3>{name}</h3>
                <p>specialization: {!specialization?(null):(specialization.name)}</p>
                <p>{clinic_location}</p>
                <p>{about}</p>
            </div>
            <div className='row'>
                {list}
            </div>
            </div>
            
        </div>
    )
}
export default LeftAllDoctor