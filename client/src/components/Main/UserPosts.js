import React, {Component} from 'react';
import axios from 'axios'

class UserPosts extends Component{
    constructor(props){
        super(props)
        this.state ={
            users: []
        }
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