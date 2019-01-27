import React from 'react';
import img from '../static/chattrbox.png';

class LoginScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            userName: ""
        }
    }

    onChange = (e) => {
        this.setState({
            userName: e.target.value,
        })

    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.userName)

    }

    render() {
        return (
        <div className="myfrontscreencontainer">
           <div className="form-group userform">
                <div className="centered">
                    <img src={img} width="150" height="150"  alt="" />
                </div>
                <div className="centered">
                    <p style={{fontSize:"20px", fontStyle: 'italic', color: '#007bff'}}>Chat the day away :')</p>
                    <button style={{background: '#da8643', border: '0px', fontSize: '20px'}} className="btn btn-primary" onClick={this.props.onClick}>Login</button>
                </div>
            </div> 
        </div>)
    }

}

export default LoginScreen;