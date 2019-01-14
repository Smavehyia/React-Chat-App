import React, { Component } from 'react'
import UserForm from './components/UserForm';
import MainScreen from './components/Mainscreen';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentScreen: 'UserFormScreen',
            currentUserName: '',
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
            this.setState({
                currentScreen: 'MainScreen', 
                currentUserName: userName,
            })
        }).catch((err) => console.log(err))

    }
  render() {
      if (this.state.currentScreen === 'UserFormScreen') {
          return  <UserForm onSubmit={this.onUserNameSubmitted} />
      }
      else if (this.state.currentScreen === 'MainScreen') {
          return <MainScreen currentUserName={this.state.currentUserName}/>
      }
  }
}

export default App
