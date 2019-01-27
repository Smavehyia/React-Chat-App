import React from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import Messages from './Messages';
import SendMsgForm from './SendMsgForm';
import TypingIndicator from './TypingIndicator';
import OnlineList from './OnlineList';
import '../styles/app.css'
import RoomList from './RoomList';
import RoomForm from './RoomForm';

class MainScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: {},
            roomId: null,
            messages: [],
            typingUsers: [],
            joinableRooms: [],
            joinedRooms: [],
        }

    }

    onUserNameSubmitted = (userName) => {
        fetch('http://localhost:3001/users' , {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({userName})
        }).then((response) => {
        }).catch((err) => console.log(err))
      }

    componentDidMount() {
        this.onUserNameSubmitted(this.props.currentUserName);
        
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

            this.getJoinableRooms();
        })
        .catch(err => {
            console.log('Error on connection', err)
          })

    }

    subscribeToRoom = (roomId) => {
        this.setState({
            messages: [],
        })
        return this.state.currentUser.subscribeToRoom({
            roomId: roomId,
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
        .then(room => {
            this.setState({
                roomId: room.id,
                currentRoom: room,
            })
            this.getJoinableRooms()
        })
        .catch((err) => console.log('error on subscribing to room: ', err))
    }

    sendMessage = (msg) => {
        this.state.currentUser.sendMessage({
            roomId: this.state.roomId,
            text: msg
        })
    }

    sendIsTyping = () => {
        this.state.currentUser.isTypingIn({
            roomId: this.state.roomId,
        })
        .catch((err) => console.log(err) )

    }

    getJoinableRooms = () => {
        this.state.currentUser.getJoinableRooms()
        .then(joinableRooms => {
            this.setState({
                joinableRooms,
                joinedRooms: this.state.currentUser.rooms
            })
        })
        .catch(err => console.log('error on joinableRooms: ', err))
    }

    createRoom = (name) => {
        this.state.currentUser.createRoom({
            name
        })
        .then(room => this.subscribeToRoom(room.id))
        .catch(err => console.log('error with createRoom: ', err))
    }

    render() {
        return (
            <div className={ this.state.roomId? "app-room" : "app"}>
                <RoomList 
                    subscribeToRoom={this.subscribeToRoom} 
                    rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
                    currentRoomId={this.state.roomId} />
                <RoomForm createRoom={this.createRoom} />
                { this.state.roomId &&
                    <OnlineList users={this.state.currentRoom.users} currentUser={this.state.currentUser}/>
                }
                <Messages 
                    messages={this.state.messages}
                    roomId={this.state.roomId}/>
                <TypingIndicator typingUsers={this.state.typingUsers} />
                <SendMsgForm onSubmit={this.sendMessage} onChange={this.sendIsTyping} disabled={!this.state.roomId}/>
            </div>
        )
    }
}

export default MainScreen;