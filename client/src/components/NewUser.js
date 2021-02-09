import React, { Component } from 'react';
import axios from 'axios';

class NewUser extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: "",
            submit: false,
            enteredName: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.name === prevState.name && this.state.submit === true && !this.state.enteredName){
            console.log("This needs to happen once");
            axios.post('http://localhost:5000/api/update/name',{id: this.props.id, name: this.state.name})
            .then(response =>{
                console.log(response.data)
                this.setState({
                    enteredName: true
                })
            })
            .catch(axiosErr =>{
                console.log(axiosErr)
            })
        }
    }

    handleChange(e){
        this.setState({
            name: e.target.value
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
                <div>Hello</div>
                <form className="row" onSubmit={this.handleSubmit}>
                    <div className="col-12"><input type="text" name="name" onChange={this.handleChange} placeholder="Enter First Name" required/></div>
                    <div className="col-12"><button type="submit">Submit</button></div>
                </form>
            </div>
        )
    }
}

export default NewUser;