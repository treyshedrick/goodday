import React, {Component} from 'react';
import axios from 'axios'

class UserPosts extends Component{
    constructor(props){
        super(props)
        this.state ={
            users: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3000/api/userposts')
        .then(response =>{
            console.log(response)
        })
        .catch(axiosErr =>{
            console.log(axiosErr)
        })
    }

    render(){
        return(
                <div className="UserPosts">
                    Testing . . . Will show other user posts
                </div>
            )
        }
    }

export default UserPosts