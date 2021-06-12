import react from 'react'
import './left.css'
import Appointment from '../appointment/appointment'
import AllSession from '../all-Session/all-Session'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
class Left extends react.Component{
    constructor(props){
        super(props)
        this.state={
            spec:[],
            categorie:true,
            specname:'',
            specid:[],
            nextapp:true,
            active_res:false,
            prediction_result:[],
            error:'',
            updatesession:true
        }
    }
    
    componentDidMount() {
        fetch("https://thediseasefighter.herokuapp.com/specializations", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        this.setState({spec:data.specializations})
                        
                    })
                    .catch((err) => console.log(err));
        
    }
    uploadModel=(e)=>{
        var modelname=this.state.specname.toLowerCase()
        if(modelname==='chest'){
            modelname='covid19'
        }
        this.setState({active_res:true,prediction_result:[],error:''})
        const file=e.target.files[0]
        const formData = new FormData();
        formData.append("file",file);
        console.log(formData);
        fetch(
            `https://thediseasefighter.herokuapp.com/model/${modelname}`,
            {
                method: "POST",
                body: formData,
                mode: "cors",
                headers: {
                    Authorization: `Barer ${window.localStorage.getItem(
                        "token"
                    )}`,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                this.setState({prediction_result:data.prediction_result,error:data.message})
            })
            .catch((err) => console.log(err));
    }
   render(){
    return(   
        <div className='left'>
            {this.props.setcat(this.state.categorie)}
            <div className='top-left'>
                {this.state.categorie?(
                    <div>
                    <h3>Categories</h3>
                <div className='categories-img'>
                    {this.state.spec.map((spec)=>(<img src={spec.image} alt={spec.name} onClick={()=>{this.setState({specname:spec.name,categorie:false})}}/>))}
                
                </div> </div>
                ):(<div className='model'> 
                <i className="fa fa-arrow-left go-back" onClick={()=>this.setState({categorie:true,active_res:false})}> GO BACK</i>
                <h3> Diagnosis disease with ML</h3>
                <h4> This is {this.state.specname} Clink</h4>
                <div className='model2'>
                    {this.state.active_res?(
                        <div>
                            {!this.state.prediction_result?(
                                <p>Please Wait , {this.state.error}</p>
                                )
                                
                            :(<div className='Circular-container'>
                                {this.state.prediction_result.map((pred)=>(
                                <div className='test'>
                                <CircularProgressbarWithChildren value={pred.percentage}>
                                <p className='pred'>{pred.percentage}%</p>
                                    <p>{pred.type}</p>
                                </CircularProgressbarWithChildren>
                            </div>))}
                        </div>
                        )}
                        </div>
                        
                    ):
                    (
                        <div className="drag-area" >
                    <br />
                    <label htmlFor='model'>
                    <div className="icon" htmlFor='model'><i class="fa fa-upload"></i></div>
                        Drop Your Files Here</label>
                    <input type="file" id='model' hidden onChange={this.uploadModel}/>
                </div>
                    )}
                
                
                </div>
                </div>)}
                
            </div>
            <div className='bottom-left'>
                <div className='appointment-header'>
                    <h3>My Appointment</h3>
                    <p className={this.state.nextapp?('appointment-activate'):(null)} onClick={()=>this.setState({nextapp:true})}>Next Appointment</p>
                    <p className={this.state.nextapp?(null):('appointment-activate')} onClick={()=>this.setState({nextapp:false})}>Prevoius Appointment</p>
                </div>
                {this.state.updatesession?(
                    <AllSession nextapp={this.state.nextapp} setState={state => this.setState(state)}/>
                ):(null)}
                
            </div>
        </div>
    
    )
   }
}
export default Left;