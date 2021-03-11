import {Component} from 'react';
import axios from 'axios';

class TasksCompleted extends Component{
    constructor(props){
        super(props)
        this.state = {
            percentage: 0
        }
    }

    componentDidMount(){
        axios.post('http://localhost:3000/api/taskpercentage',{id: this.props.user.id})
        .then(response =>{
            this.setState({
                percentage: response.data.percentCompleted
            })
        })
        .catch(axiosErr =>{
            console.log(axiosErr)
        })
    }
    render(){
        console.log(this.state.percentage)
        if(this.state.percentage > 0){
            return(
                <div className="actionsrow">
                    You have completed {this.state.percentage}% of your most important daily tasks this week! Keep it up!
                </div>
            )
        } else if(this.state.percentage == null){
            return(
                <div className="actionsrow">You have not completed any tasks this week</div>
            )
        } else{
            return(
                <div></div>
            )
        }
    }
}

export default TasksCompleted;