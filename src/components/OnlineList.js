import React from 'react';

class OnlineList extends React.Component {
    render() {
        if (this.props.users) {
            return (
                <div className="friend-list" style={{marginLeft: '10px'}}>
                    {this.props.users.map ((user, idx) => {
                        if (user.id === this.props.currentUser.id) {
                            return (
                            <li style={{listStyle: 'none'}} className="friend-list">
                                <div style={{float: 'left'}} className='friend_box online_person'></div>
                                <p>{user.name} (You)</p>
                            </li>
                            )
                        } 
                        return (
                            <li style={{listStyle: 'none'}} className="friend-list">
                                <div style={{float: 'left'}} className={user.presence.state === 'online' ? 'friend_box online_person' : 'friend_box offline_person'}></div>
                                <p >{user.name}</p>
                            </li>
                        )
                    })}
                </div>
            )
        } else {
            return <p>Loading ....</p>
        }
    }
}

export default OnlineList;