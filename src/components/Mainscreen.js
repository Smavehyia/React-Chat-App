import React from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import Messages from './Messages';
import SendMsgForm from './SendMsgForm';
import TypingIndicator from './TypingIndicator';
import OnlineList from './OnlineList';
import '../styles/app.css'

class MainScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: {},
            currentRoom: {},
            messages: [],
            typingUsers: [],
        }

    }

    componentDidMount() {
        const chatManager = new ChatManager({
            instanceLocator: 'v1:us1:d9c5edea-aaff-445a-9148-adc2ddab3e6a',
            userId: this.props.currentUserName,
            tokenProvider: new TokenProvider({ 
                url: 'http://localhost:3001/authenticate' }),
          })
        
        chatManager.connect()
        .then((currentUser) => {
            this.setState({
                currentUser
            });
            return currentUser.subscribeToRoom({
                roomId: '19386508',
                messageLimit: 100,
                hooks: {
                    onMessage: message => {
                        this.setState({
                            messages: [...this.state.messages, message],
                        })
                    },
                    onUserStartedTyping: user => {
                        this.setState({
                            typingUsers: [...this.state.typingUsers, user.name]
                        })
                    },
                    onUserStoppedTyping: user => {
                        this.setState({
                            typingUsers: this.state.typingUsers.filter((usrname) => usrname !== user.name)
                        })
                    },
                    onPresenceChange: () => this.forceUpdate(),
                    onUserJoined: () => this.forceUpdate(),

                }
            })
        })
        .then((currentRoom) => {
            this.setState({
                currentRoom
            })
        })
        .catch(err => {
            console.log('Error on connection', err)
          })

    }

    sendMessage = (msg) => {
        this.state.currentUser.sendMessage({
            roomId: this.state.currentRoom.id,
            text: msg
        })
    }

    sendIsTyping = () => {
        this.state.currentUser.isTypingIn({
            roomId: this.state.currentRoom.id,
        })
        .catch((err) => console.log(err) )

    }

    render() {
        return (
            <div className="mycontainer">
                <div className="message_container">
                    <aside className="friend_list">
                        <OnlineList users={this.state.currentRoom.users} currentUser={this.state.currentUser} />
                    </aside>
                    
                    <section className="friend_list_container">
                        <Messages messages={this.state.messages}/>
                        <TypingIndicator typingUsers={this.state.typingUsers} />
                        <SendMsgForm onSubmit={this.sendMessage} onChange={this.sendIsTyping}/>
                    </section>
                </div>
            </div>
        )
    }
}

export default MainScreen;