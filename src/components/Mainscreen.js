import React from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'

class MainScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: {},
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
            })
        })
        .catch(err => {
            console.log('Error on connection', err)
          })

    }

    render() {
        return <div>
            <h1> Welcome {this.props.currentUserName}</h1>
        </div>
    }
}

export default MainScreen;