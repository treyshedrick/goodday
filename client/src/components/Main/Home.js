import React, { Component } from 'react';

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
                    <div className="col-6">SOMETHING POSITIVE {/*Post Component*/}</div>
                    <div className="col-6">TASKS {/*Task Components*/}</div>
                </div>
            </div>
        )
    }
}

export default Home