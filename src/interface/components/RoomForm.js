import React from "react";
import Button from "./Button";

class RoomForm extends React.Component {
    state = {
        title: "",
    };
    
    onSubmit = async (e) => {
        e.preventDefault();
        const { title } = this.state;
        this.props.onCreateRoom({title});
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
                <div className="form-group">
                    <label>Room name</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        onChange={this.onChange}
                        required
                        />
                </div>
                <div className="form-group">
                    <Button
                        type="submit"
                        mx={0}
                        my={0}
                        color="secondary"
                    >
                        Create
                    </Button>
                </div>
            </form>
        )
    }
}

export default RoomForm;