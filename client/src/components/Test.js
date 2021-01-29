import React, { Component } from 'react';
import axios from 'axios';

class Test extends Component{
    constructor(props){
        super(props)
        this.state = {
            test: null,
            error: null,
            resp: null,
            isLoaded: false
        }
    }

    componentDidMount(){
        axios.get("http://localhost:5000/api/hello")
        .then(response =>{
            this.setState({
                test: response.data.express
            })
        })
        .catch(axiosError =>{
            this.setState({
                error: axiosError
            })
        })

        axios.post("http://localhost:5000/api/world",({post: "Test"}))
        .then(response =>{
            this.setState({
                resp: response.data,
                isLoaded: true
            })
        })
        .catch(axiosError =>{
            console.log(axiosError)
        })
    }
    render() {
        if(this.state.isLoaded){
        console.log(this.state.isLoaded)
        return(
            <div>
                <div>{this.state.test}</div>
                <div>Response: {this.state.resp}</div>
            </div>
            )
        } else {
            return(
                <div>Loading...</div>
            )
        }
    }
}

export default Test;