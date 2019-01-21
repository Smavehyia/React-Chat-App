import React from 'react';

class OnlineList extends React.Component {
    render() {
        const OnlinePerson = () => {
            const isOnline = this.props.presenceState === 'online' ? true: false;
            return <li className="">
                <div className={isOnline? 'online_person' : 'offline_person'}>
                    {this.props.children}
                </div>
            </li>
        }
        const isOnline = this.props.presenceState === 'online' ? true: false;

        if (this.props.users) {
            return (
                <div>
                    <h2 style={{marginLeft: '10px'}}>Online Chattrs</h2>
                    {this.props.users.map ((user, idx) => {
                        if (user.id === this.props.currentUser.id) {
                            return (
                            <li className="friend_li">
                                <div className='friend_box online_person'></div>
                                {user.name} (You)
                            </li>
                            )
                        } 
                        return (
                            <li className="friend_li">
                                <div className={user.presence.state === 'online' ? 'friend_box online_person' : 'friend_box offline_person'}></div>
                                {user.name}
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