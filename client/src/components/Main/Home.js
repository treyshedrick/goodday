import Post from './Post';
import Task from './Task';

let Home = (props) => {
    return(
        <div className="main container">
            <div className="row">
                <div className="col-12 hello">Hello {props.user.name}</div>
            </div>
            <div className="row">
                <div className="col-lg-6"><Post user={props.user}/></div>
                <div className="col-lg-6"><Task user={props.user}/></div>
            </div>
        </div>
        )
    }

export default Home