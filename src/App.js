import React, { Component } from 'react';
import './styles/app.css';
import {CustomNavbar} from './components/Navbar';

class App extends Component {

    goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  isLoggedIn() {
       this.props.auth.isAuthenticated();
  }

  render() {

    const { isAuthenticated } = this.props.auth;

    return (
      <div>
          { isAuthenticated() && <CustomNavbar 
            isAuthenticated={isAuthenticated} 
            onClickHome={this.goTo.bind(this, 'home')} 
            onClickProfile={this.goTo.bind(this, 'profile')}
            onClickChat={this.goTo.bind(this, 'chat')}
            onClickLogin={this.login.bind(this)} 
            onClickLogout={this.logout.bind(this)} />  }
            { !isAuthenticated() && null
            }
      </div>
    );
  }
}

export default App;
