import React from 'react';

class SendMsgForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            message: ""
        }
    }

    onChange = (e) => {
        this.setState({
            message: e.target.value,
        })
        this.props.onChange();

    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.message);
        this.setMsgToEmpty();

    }

    setMsgToEmpty = () => {
        this.setState({
            message: '',
        })
    }
    render() {
        return (
           <form className="send-message-form" onSubmit={this.onSubmit}>
               <input 
                    name="message" 
                    type="text" 
                    value={this.state.message}
                    placeholder="Type your message..." 
                    onChange={this.onChange}
                    disabled={this.props.disabled} />
            </form> 
            )
    }

}

export default SendMsgForm;