import React from 'react';
import ReactDOM from 'react-dom'

class Messages extends React.Component {

    componentWillUpdate() {
        const node = ReactDOM.findDOMNode(this);
        this.shouldScrollBottom = node.scrollTop + node.clientHeight + 50 >= node.scrollHeight;
    }

    componentDidUpdate() {
        if (this.shouldScrollBottom) {
            const node = ReactDOM.findDOMNode(this);
            node.scrollTop = node.scrollHeight
        }
    }
    render() {
        if (!this.props.roomId) {
            return (                
            <div className="message-list">
                <div className="join-room">
                    WELCOME TO CHATTR-BOX! <br/>
                    Join a room to start chatting!
                </div>
            </div>)
        }

        return (
            <div className="message-list">
                    {this.props.messages.map((message, idx) => (
                            <div key={idx} className="message"> 
                                <div className="message-username">{message.senderId}</div>
                                <div className="message-text">{message.text}</div>
                            </div>
                    ))}
            </div>
        )
    }

}

export default Messages;