let UserPostItem = (props) =>{
    let posteddate = new Date(props.post.dateposted)
    return(
        <div className="PostItem col-12">
            <div>{props.post.post}</div>
            <div className="smtxt inline">- {props.post.firstname}</div>
            <div className="smtxt inline">{posteddate.toLocaleDateString('en-US')}</div>
        </div>
    )
}

export default UserPostItem