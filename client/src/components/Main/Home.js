import Post from './Post';
import Task from './Task';
import UserPosts from './UserPosts';
import TasksCompleted from './TasksCompleted';
import LogOut from './LogOut'

let Home = (props) => {
    return(
        <div className="main container">
            <div className="row">
                <div className="col-6 hello">Hello {props.user.name}</div>
                <div className="col-6 p-2"><LogOut /></div>
            </div>
            <div className="row actionsrow">
                <div className="col-lg-6"><Post user={props.user}/></div>
                <div className="col-lg-6"><Task user={props.user}/></div>
            </div>
            <div className="row">
                <div className="col-12">
                    <TasksCompleted user={props.user} />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <UserPosts user={props.user} />
                </div>
            </div>
        </div>
        )
    }

export default Home