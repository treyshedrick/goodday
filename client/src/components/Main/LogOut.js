import React, {Component} from 'react';
import axios from 'axios'

class LogOut extends Component{
    constructor(props){
        super(props)
        this.state = {
            logout: false,
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.logout === true){
            window.location.reload();
        }
    }

    handleSubmit(e){
        axios.get('http://localhost:5000/api/logout')
        .then(response =>{
            this.setState({
                logout: true
            })
        })
        .catch(axiosErr =>{
            console.log(axiosErr)
        })

        e.preventDefault();
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div><button type="submit" className="main-btn">Logout</button></div>             
                </form>
            </div>
        )
    }
}

export default LogOut