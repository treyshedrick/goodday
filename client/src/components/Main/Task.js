import React, {Component} from 'react'
import axios from 'axios'

class Task extends Component{
    constructor(props){
        super(props)
        this.state = {
            task: "",
            submit: false,
            posted: false,
            newTask: false,
            insertedResponse: "",
            taskid: -1,
            completedtask: false
        }        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCompleted = this.handleCompleted.bind(this);
    }

    componentDidMount(){
        let post = {id: this.props.user.id, task: true}
        axios.post('http://localhost:5000/api/postedtoday', post)
        .then(response =>{
            if(response.data.didPost){
                this.setState({
                    posted:true,
                    insertedResponse: response.data.positiveresponse,
                    taskid: response.data.id
                })
            }
            else{
                this.setState({
                    newTask: true
                })
            }
        })
        .catch(axiosErr =>{
            console.log(axiosErr)
        })
        
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.positivePost === prevState.positivePost && !this.state.posted && this.state.submit){
            let post = {id: this.props.user.id, task: this.state.task}
            console.log("Post should only occur once")
            axios.post('http://localhost:5000/api/task', post)
            .then(response =>{
                this.setState({
                    posted: true,
                    insertedResponse: response.data.taskresponse,
                    taskid: response.data.id
                })
            })
            .catch(axiosErr =>{
                console.log(axiosErr)
            })
        }
    }

    handleChange(e){
        this.setState({
            task: e.target.value
        })
        e.preventDefault();
    }

    handleSubmit(e){
        this.setState({
            submit: true
        })
        e.preventDefault();
    }

    handleCompleted(){
        axios.post('http://localhost:5000/api/updatetask', {taskid: this.state.taskid})
        .then(response =>{
            this.setState({
                completedtask: response.data
            })
        })
        .catch(axiosErr =>{
            console.log(axiosErr)
        })
    }

    render(){
        console.log(this.state.taskid)
        if(!this.state.posted && this.state.newTask){
        return(
            <div>
                <div>What do you want to get done today!?</div>
                <form onSubmit={this.handleSubmit}>
                    <textarea placeholder="Say something positive about the day!" onChange={this.handleChange} required></textarea>
                    <button type="submit">Post!</button>                
                </form>
            </div>
        )
        } else if(this.state.posted && !this.state.completedtask){
            return(
                <div>
                    <div>{this.state.insertedResponse}</div>
                    <button onClick={this.handleCompleted}>Completed Task</button>
                </div>
            )
        } else if(this.state.completedtask){
            return(
                <div>Task Completed For The Day!</div>
            )
        } else{
            return(
                <div></div>
            )
        }
    }
}

export default Task