import React, {Component} from 'react';
import axios from 'axios'

class Post extends Component{
    constructor(props){
        super(props)
        this.state = {
            positivePost: "",
            submit: false,
            posted: false
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.positivePost === prevState.positivePost && !this.state.posted && this.state.submit){
            let post = {id: this.props.user.id, post: this.state.positivePost}
            console.log("Post should only occur once")
            axios.post('http://localhost:5000/api/post', post)
            .then(response =>{
                console.log(response)
                this.setState({
                    posted: true
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
        return(
            <div>
                <div>Something Positive</div>
                <form onSubmit={this.handleSubmit}>
                    <textarea placeholder="Say something positive about the day!" onChange={this.handleChange}></textarea>
                    <button type="submit">Post!</button>                
                </form>
            </div>
        )
    }
}

export default Post