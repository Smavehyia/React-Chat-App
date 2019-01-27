import React, { Component } from 'react';
import LoginScreen from './LoginScreen';
import MainScreen from './Mainscreen';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentUserName: '',
            profile: {},
        }
    }

  login() {
    this.props.auth.login();

  }

  logout() {
      this.props.auth.logout();
  }

  render() {
    const { isAuthenticated, getProfile } = this.props.auth;
    return (
          <div>
              {
                  !isAuthenticated() && <LoginScreen onClick={this.login.bind(this)}/>
                  
              }
              {
                  isAuthenticated() && 
                    <MainScreen currentUserName={getProfile.name} onClickLogout={this.logout.bind(this)}/>
              }
            {this.props.children}
        </div>
    );
  }
}

export default Home;