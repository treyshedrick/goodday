import React, { Component } from 'react';
import axios from 'axios';

class Test extends Component{
    constructor(props){
        super(props)
        this.state = {
            test: null,
            error: null
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
    }

    render() {
        return(
            <div>{this.state.test}</div>
        )
    }
}

export default Test;