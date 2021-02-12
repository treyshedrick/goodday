import Post from './Post';
import Task from './Task';

let Home = (props) => {
    console.log(props.user)
    return(
        <div className="main container">
            <div className="row">
                <div className="col-12">Hello {props.user.name}</div>
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

export default Home