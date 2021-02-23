import React, {Component} from 'react';
import axios from 'axios'

class Post extends Component{
    constructor(props){
        super(props)
        this.state = {
            positivePost: "",
            submit: false,
            posted: false,
            newPost: false,
            insertedResponse: ""
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        let post = {id: this.props.user.id}
        axios.post('http://localhost:5000/api/postedtoday', post)
        .then(response =>{
            if(response.data.didPost){
                this.setState({
                    posted:true,
                    insertedResponse: response.data.positiveresponse
                })
            }
            else{
                this.setState({
                    newPost: true
                })
            }
        })
        .catch(axiosErr =>{
            console.log(axiosErr)
        })
        
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.positivePost === prevState.positivePost && !this.state.posted && this.state.submit){
            let post = {id: this.props.user.id, post: this.state.positivePost}
            console.log("Post should only occur once")
            axios.post('http://localhost:5000/api/post', post)
            .then(response =>{
                this.setState({
                    posted: true,
                    insertedResponse: response.data
                })
            })
            .catch(axiosErr =>{
                console.log(axiosErr)
            })
        }
    }

    handleChange(e){
        this.setState({
            positivePost: e.target.value
        })
        e.preventDefault();
    }

    handleSubmit(e){
        this.setState({
            submit: true
        })
        e.preventDefault();
    }

    render(){
        if(!this.state.posted && this.state.newPost){
        return(
            <div>
                <div>Something Positive</div>
                <form onSubmit={this.handleSubmit}>
                    <textarea placeholder="Say something positive about the day!" onChange={this.handleChange} required></textarea>
                    <button type="submit">Post!</button>                
                </form>
            </div>
        )
        } else if(this.state.posted){
            return(
                <div>{this.state.insertedResponse}</div>
            )
        } else {
            return(
                <div>Loading ...</div>
            )
        }
    }
}

export default Post