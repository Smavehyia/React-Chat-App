import React from 'react';

class UserForm extends React.Component {
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
        <div>
           <form onSubmit={this.onSubmit}>
               <label>Username: </label>
               <input 
                    name="userName" 
                    type="text" 
                    placeholder="What's your username?" 
                    onChange={this.onChange} />
               <input type="submit" />
            </form> 
        </div>)
    }

}

export default UserForm;