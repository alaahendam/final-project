import react from 'react';
import './top-doctor.css'
import Doctor from '../../image/Doctor.png'
const TopDoctor =({name,spec_id,specialization,clinic_location,reviews,...doctor})=>{
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
    return(
        
        <div className='topdoctor-componant'>
            <img src={Doctor} alt='doctor img'/>
            <div className='row'>
            <div className='topdoctor-data'>
                <h3>{name}</h3>
                <p>specialization: {!specialization?(null):(specialization.name)}</p>
                <p>{clinic_location}</p>
            </div>
            <div className='row'>
                {list}
            </div>
            </div>
            
        </div>
    )
}
export default TopDoctor