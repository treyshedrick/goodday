import React, { Component } from 'react';
import Post from './Post';
import Task from './Task';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        console.log(this.props)
        return(
            <div className="main container">
                <div className="row">
                    <div className="col-12">Hello {this.props.user.name}</div>
                </div>
                <div className="row">
                    <div className="col-12"><Post /></div>
                </div>
                <div className="row">
                    <div className="col-12"><Task /></div>
                </div>
            </div>
        )
    }
}

export default Home