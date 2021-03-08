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
        return(
            <div className="actionsrow">You have completed {this.state.percentage}% of your most important daily tasks this week! Keep it up!</div>
        )
    }
}

export default TasksCompleted;