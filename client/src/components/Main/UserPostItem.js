let UserPostItem = (props) =>{
    let posteddate = new Date(props.post.dateposted)
    return(
        <div className="PostItem col-12">
            <div>{props.post.post}</div>
            <div>- {props.post.firstname} </div>
            <span>{posteddate.toLocaleDateString('en-US')}</span>
        </div>
    )
}

export default UserPostItem