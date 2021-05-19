import {react,useState} from 'react'
import {withRouter} from 'react-router-dom'
import './endsession.css'
import '../../componant/container/container.css'
import Docu from '../../image/Docu-diag.png'
import Img from '../../image/img-diag.png'

const EndSession=({data,match})=>{
    const [Session,SetSession]=useState(false)
    const [Diagnosis,SetDiagnosis]=useState('')
    const [Medicine,SetMedicine]=useState('')
    const [Doc,SetDoc]=useState(null)
    const [Image,SetImage]=useState(null)
    var patient={}
    if(data){
        if(match.params.id){
            patient=data.filter((obj)=>{return obj.id === parseInt(match.params.id)})
            console.log(data)
            console.log(patient)
        }
        else{
            patient=data
        }
    }
    const SubmitSession=()=>{
        const diag={'diagnosis':Diagnosis,'medicines':Medicine}
        fetch(`https://thediseasefighter.herokuapp.com/sessions/${patient[0].id}`, {
            method: "PATCH",
            body: JSON.stringify(diag),
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                  "token"
              )}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                })
            .catch((err) => {console.log(err)});

            var data = new FormData()
            data.append('file', Doc)
            data.append('file', Image)
            data.append('key', '123')
            console.log(data)
            fetch(`https://thediseasefighter.herokuapp.com/sessions/${patient[0].id}/files`, {
              method: 'PATCH',
              body: data,
              headers: {
                              Authorization: `Bearer ${window.localStorage.getItem(
                                  "token"
                      )}`
              }
            })
            .then(response => response.json())
            .then(data => {
              console.log(data)
            })
            .catch(error => {
              console.error(error)
            })
        }
    
    return(
        <div className='endsession'>
            <div>
                {console.log(patient[0])}
                {patient[0]?(
                    <div >
                        {Session?(<div className='diag row'>
                            <div className='end-session'>
                                <button className='btn' onClick={SubmitSession}>End Meeting</button>
                            </div>
                            <div className='about'>
                                <label>Add A Diagnosis</label>
                                <input type="text" placeholder='Enter a Diagnosis' onChange={(e)=>SetDiagnosis(e.target.value)}/>
                                <label>Add A Medicine</label>
                                <input type="text" placeholder='Enter a Medicine' onChange={(e)=>SetMedicine(e.target.value)} />
                                <label>Add A Files</label>
                                <div className='row'>
                                <label htmlFor='diagf1'><img src={Docu} alt="" className='diag-img'/></label>
                                <label htmlFor='diagf2'><img src={Img} alt="" className='diag-img'/></label>
                                </div>
                                <input type='file' id='diagf1' onChange={(e)=>SetDoc(e.target.files[0])}/>
                                <input type='file' id='diagf2' onChange={(e)=>SetImage(e.target.files[0])}/>
                            </div>
                        </div>):(<div className='about'>
                            <div className='about-header'>
                        <img src={patient[0].patient_avatar} alt="" />
                        <h3>{patient[0].name}</h3>
                    </div>
                    <div className='about-detail'>
                        <h3>About</h3>
                        <div className='custom-input about-style'>{patient[0].comment}</div>
                        <h3>diagnosis</h3>
                        <div className='custom-input'>{patient[0].diagnosis?(patient[0].diagnosis):('No Previous Diagnosis')}</div>
                        <h3>Phone Number</h3>
                        <div className='custom-input'>{patient[0].phone}</div>
                        <div className='row'>
                            <div>
                            <h3>Gender</h3>
                            <div className='custom-input gender'>{patient[0].gender}</div>
                            </div>
                            <div>
                            <h3>Date</h3>
                            <div className='custom-input date'>{patient[0].date}</div>
                            </div>
                        </div>
                        <button className='btn' onClick={()=>SetSession(true)}>Start Meeting</button>
                    </div>
                        </div>)}
                    
                </div>
                ):(null)}
                
            </div>
        </div>
    )
}
export default withRouter(EndSession);