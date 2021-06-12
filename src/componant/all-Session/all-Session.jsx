import React from 'react'
import Appointment from '../appointment/appointment'
class AllSession extends React.Component{
    constructor(props){
        super(props)
        this.state={
            currdata:[],
            nextdata:[],
            prevdata:[],
        }
    }
    componentDidMount() {
        fetch("https://thediseasefighter.herokuapp.com/sessions", {
            method: "GET",
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
                this.setState({prevdata:data.previous_appointments,nextdata:data.future_appointments,currdata:data.current_appointments})
            })
            .catch((err) => console.log(err));
    }

    render(){
        const setState=this.props.setState
        return(
            <div>
                {this.props.nextapp?(
                    <div>
                        {this.state.currdata?(
                    this.state.currdata.map((app)=> <Appointment key={app.id}{...app} setState={setState}/>)
                    ):(null)}
                    {this.state.nextdata?(
                        this.state.nextdata.map((app)=> <Appointment key={app.id}{...app} setState={setState}/>)
                    ):(null)}
                    </div>
                ):(
                    this.state.prevdata?(
                        this.state.prevdata.map((app)=> <Appointment key={app.id}{...app} setState={setState}/>)
                    ):(null)
                    
                )}
            </div>
        )
    }
}
export default AllSession