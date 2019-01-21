import React from 'react';

class Messages extends React.Component {
    render() {
        return (
            <div className="messages_list_container">
                <ul className="no_bullet_list">
                    {this.props.messages.map((message, idx) => (
                        <li key={idx} className="list">
                            <div>
                                <span className="user_name">{message.senderId}</span>
                            </div>
                            <p className="message_style">{message.text}</p>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

}

export default Messages;