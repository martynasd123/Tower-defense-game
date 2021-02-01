import React from "react";
import Button from "./Button";
import { login } from "../api/index";

class ChatBox extends React.Component {
    state = {
        message: ""
    }
    onSubmit = (e) => {
        e.preventDefault();
        
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
                    {messages?.map(m => (
                        <li className="message">{`${m.date} `} <span className="author">{m.username}:</span> {` ${m.text}`}</li>
                    ))}
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <textarea
                            type="text"
                            name="message"
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