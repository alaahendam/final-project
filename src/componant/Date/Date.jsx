import react from 'react'
import './Date.css'
import AddDate from '../../componant/AddDate/AddDate'
import UpdateDate from '../../componant/updateDate/updateDate'
class Dates extends react.Component{
    constructor(){
        super()
        this.state={
            available:[],
            date:['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'],
            data:[]
        }
    }
    
    componentDidMount() {
        fetch("https://thediseasefighter.herokuapp.com/user", {
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
                        data.current_user.available_dates.map((day)=>this.setState({available:this.state.available.concat(day.day)}))
                        this.setState({data:data.current_user.available_dates})

                    })
                    .catch((err) => console.log(err));
    }
    render(){
        return(
            <div className='Date'>
                <AddDate {...this.state} setState={this.props.setState}/>
                {this.state.data.map((date)=>(
                    <UpdateDate {...date} key={date.id} setState={this.props.setState}/>
                ))}
                
            </div>
        )
    }
}
export default Dates;