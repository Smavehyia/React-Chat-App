import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export class CustomNavbar extends React.Component {

    render() {
        return (
            <Navbar className="no-border" style={{background: '#2d314f99'}}fluid inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/home"><h3 style={{color: '#ffffff'}}>CHATTR-BOX</h3></a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav className="pull-right">
              {
                  this.props.isAuthenticated() && (
                    <button style={{background: '#2e2e50', border: '0px', fontSize: '16px', marginTop: '5px'}} className="btn btn-primary btn-block" onClick={this.props.onClickLogout}> Log out</button>
                  )
              }
          </Nav>
        </Navbar>
        )
    }
}