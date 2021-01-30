import React, { Component } from 'react';
import axios from 'axios';

class Inspiration extends Component{
    constructor(props){
        super(props)
        this.state = {
            quote: null,
            author: null,
            isLoaded: false,
            error: null
        }
    }

    componentDidMount(){
        axios.get("http://localhost:5000/api/zenquote")
        .then(response =>{
            this.setState({
                quote: response.data.quote.q,
                author: response.data.quote.a,
                isLoaded: true
            })
        })
        .catch(axiosError =>{
            this.setState({
                error: axiosError
            })
        })
    }
    render() {
        if(this.state.isLoaded){
        return(
            <div className="quote">
                <div>{this.state.quote}</div>
                <div>- {this.state.author}</div>
            </div>
            )
        } else {
            return(
                <div>Loading...</div>
            )
        }
    }
}

export default Inspiration;