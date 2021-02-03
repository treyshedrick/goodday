import React, { Component } from 'react';
import axios from 'axios';

class LogIn extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: null,
            password: null,
            submit: false,
            isLoggedIn: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.email === this.state.email && this.state.password === prevState.password){
            console.log("Make sure updates occur on click")
            axios.post('http://localhost:5000/login',{email: this.state.email, password: this.state.password})
            .then(response =>{
                console.log(response.data)
            })
            .catch(axiosErr =>{
                console.log(axiosErr)
            }) 
        }
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e){
        this.setState({
            submit: true
        })
        e.preventDefault();
    }

    render(){
        return(
            <div className="login container">    
                <form  className="row">
                    <div className="col-12">Login / Sign Up</div>
                    <div className="col-12"><input type="text" name="email" onChange={this.handleChange}/></div>
                    <div className="col-12"><input type="text" name="password" onChange={this.handleChange}/></div>
                    <div className="col-12"><button type="submit" onClick={this.handleSubmit}>Submit</button></div>
                </form>
            </div>
        )
    }
}


export default LogIn;