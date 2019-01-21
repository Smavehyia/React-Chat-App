import React from 'react';

class TypingIndicator extends React.Component {
    render() {
        if (this.props.typingUsers.length === 0) return <div></div>
        else if (this.props.typingUsers.length === 1) {
            return <p>{this.props.typingUsers[0]} is typing ...</p>
        } else if (this.props.typingUsers.length > 1) {
            return <p>{this.props.typingUsers.join( ' and ')} are typing ...</p>
        }
        
    }
}

export default TypingIndicator;