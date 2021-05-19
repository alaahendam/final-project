import react from 'react';
import './leftalldoctor.css'
import Doctor from '../../image/Doctor.png'
const LeftAllDoctor =({name,id,spec_id,specialization,clinic_location,reviews,about,setState,...doctor})=>{
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
        setState({id:id,about_flag:true})
      }
    return(
        
        <div className='alldoctor-componant' onClick={()=>SendAbout(id)}>
            <img src={Doctor} alt='doctor-img'/>
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