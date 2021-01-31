import React from "react";
import Button from "./Button";
import { login } from "../api/index";

class GuestForm extends React.Component {
    state = {
        username: "",
    };
    
    onSubmit = async (e) => {
        e.preventDefault();
        const { username } = this.state;
        const response = await login({username: username});
        if (!(response instanceof Error)) {
            this.props.onSuccess(response);
        }
    }

    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Login</h1>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        className="form-control"
                        onChange={this.onChange}
                        required
                        />
                </div>
                <div className="form-group">
                    <Button
                        type="submit"
                        className="btn-lg full-width"
                        mx={0}
                        my={0}
                        color="primary"
                    >
                        Join as a guest
                    </Button>
                </div>
            </form>
        )
    }
}

export default GuestForm;