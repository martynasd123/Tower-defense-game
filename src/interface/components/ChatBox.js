import React from "react";
import Button from "./Button";
import { login } from "../api/index";

class ChatBox extends React.Component {
    
    state = {
        message: ""
    }
    onSubmit = (e) => {
        e.preventDefault(); 
        this.props.onSendMessage(this.state.message);
        this.setState({message: ""});
    }
    
    
    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    }


    render() {
        const { messages } = this.props;
        return (
            <div>
                <div className="chat-container">
                    {messages?.map((m, index) => (
                        <li key={index} className="message">{`${m.time} `} <span className="author">{m.username}:</span> {` ${m.message}`}</li>
                    ))}
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="message"
                            value={this.state.message}
                            className="form-control"
                            onChange={this.onChange}
                            required
                        />
                        <hr />
                        <Button
                            type="submit"
                            mx={0}
                            my={0}
                            color="secondary"
                        >
                            Send
                        </Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default ChatBox;