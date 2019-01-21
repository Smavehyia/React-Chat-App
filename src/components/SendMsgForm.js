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
        <div className="send_msgform_container">
           <form onSubmit={this.onSubmit} className="send_msgform">
               <input 
                    name="message" 
                    type="text" 
                    value={this.state.message}
                    className="send_msgform_input"
                    placeholder="Type your message..." 
                    onChange={this.onChange} />
               <input type="submit" />
            </form> 
        </div>)
    }

}

export default SendMsgForm;