import React, { Component } from 'react';
import axios from 'axios';
import NewUser from './NewUser';
import Home from './Main/Home';

class LogIn extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: null,
            password: null,
            submit: false,
            newUser: false,
            isLoggedIn: false,
            invalidInputs: false,
            user: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNewUser = this.handleNewUser.bind(this);

        axios.defaults.withCredentials = true
    }

    componentDidMount(){
        axios.get('http://localhost:5000/api/login')
        .then(response =>{
            if(response.data.id > 0){
                this.setState({
                    isLoggedIn: true,
                    user: response.data
                })
            }
        })
        .catch(axiosErr =>{
            console.log(axiosErr)
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.email === this.state.email && this.state.password === prevState.password && prevState.newUser === this.state.newUser && !this.state.isLoggedIn && this.state.invalidInputs === prevState.invalidInputs){
            axios.post('http://localhost:5000/api/login',{email: this.state.email, password: this.state.password, newUser: this.state.newUser})
            .then(response =>{
                if(response.data.id > 0){
                    this.setState({
                        isLoggedIn: true,
                        user: response.data
                    })
                } else{
                    this.setState(prevState => ({
                        invalidInputs: !prevState.invalidInputs,
                        user: response.data
                    }))
                }
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

    handleNewUser(e){
        this.setState({
            newUser: !this.state.newUser
        })
        e.preventDefault();
    }

    render(){
        let userMethod = "Login"
        let btntext = 'Register';
        
        if(this.state.user.id === -2 && this.state.newUser){
            userMethod = 'Email address already used. Please use a different email address.'
            btntext = 'Back'
        } else if(this.state.newUser){
            userMethod = "Insert your email and password"
            btntext = 'Back'
        } else if(this.state.user.id === -1){
            userMethod = 'Invalid username or password. Please try again'
        }

        if(!this.state.isLoggedIn || this.state.user.id < 0){
            return(
                <div className="login container">    
                    <form className="row" onSubmit={this.handleSubmit}>
                        <div className="col-12 login-method">{userMethod}</div>
                        <div className="col-12"><input type="text" name="email" onChange={this.handleChange} placeholder="Email" required/></div>
                        <div className="col-12"><input type="password" name="password" onChange={this.handleChange} placeholder="Password" required/></div>
                        <div className="col-6 login-btn-left"><button className="good-btn" type="submit">Submit</button></div>
                        <div className="col-6 login-btn-right"><button className="good-btn" onClick={this.handleNewUser}>{btntext}</button></div>
                    </form>
                </div>
        )
        } else if(this.state.isLoggedIn && !this.state.newUser && this.state.user.id > 0){
            return(
                <Home user={this.state.user} />
            )
        } else if(this.state.newUser && this.state.isLoggedIn){
            return(
                <NewUser id={this.state.user.id} />
            )
        }
    }
}


export default LogIn;