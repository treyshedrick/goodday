import React, {Component} from 'react';
import UserPostItem from './UserPostItem';
import axios from 'axios'

class UserPosts extends Component{
    constructor(props){
        super(props)
        this.state ={
            posts: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3000/api/userposts')
        .then(response =>{
            this.setState({
                posts: response.data
            })
        })
        .catch(axiosErr =>{
            console.log(axiosErr)
        })
    }

    render(){
        console.log(this.state.posts)
        if(this.state.posts.length > 1){
            return(
                <div className="container">
                    <div className="hello">Recent Positive Posts!</div>
                    <div className="row">
                        {this.state.posts.map((i => <UserPostItem post={i} key={i.appuserpostid}/> ))}
                    </div>
                </div>
            )
        } else{
            return(
                <div>Loading. . .</div>
            )
        }
    }
}

export default UserPosts