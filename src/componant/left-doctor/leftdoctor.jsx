import react from 'react'
import './left-doctor.css'
import Doctor from '../../image/Doctor.png'
import LeftAllDoctor from '../../componant/leftalldoctor/leftalldoctor'
const LeftDoctor = ({all_doctors, setState})=>{

    return(
        <div className='leftdoctor'>
            <div className='alldoctor'>
                <div>
                    <h3>All Doctors</h3>
                    {all_doctors.map((doctor)=>(
                        <LeftAllDoctor {...doctor} setState={setState}/>
                    ))}
                </div>
             
            </div>
        </div>
    )
}
export default LeftDoctor;