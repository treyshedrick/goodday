import React, { Component } from 'react';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div className="login container">Welcome {this.props.user.name}!</div>
        )
    }
}

export default Home