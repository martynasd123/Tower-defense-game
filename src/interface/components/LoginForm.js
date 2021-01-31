import React from "react";
import Button from "./Button";
import { login } from "../api/index";
class LoginForm extends React.Component {
    state = {
        email: "",
        password: "",
    };
    
    onSubmit = (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        const result = login({email, password});
        console.log(result)
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
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        className="form-control"
                        onChange={this.onChange}
                        required
                        />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
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
                        Login
                    </Button>
                </div>
                <div>
                    {"First time logging in? "}
                    <label className="clickable" onClick={() => this.props.onRegisterClick()}> Register </label> {" or join as a "} 
                    <label className="clickable" onClick={() => this.props.onGuestClick()}> guest. </label>
                </div>

            </form>
        )
    }
}

export default LoginForm;