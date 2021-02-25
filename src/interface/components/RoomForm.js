import React from "react";
import Button from "./Button";

class RoomForm extends React.Component {
    state = {
        title: "",
        controller: 0,
    };
    
    onSubmit = async (e) => {
        e.preventDefault();
        const { title, controller } = this.state;
        this.props.onCreateRoom({
            title:title, 
            controller: controller,
        });
    }

    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    }

    onOptionChange = (e) => {
        const {name, value } = e.target;
        const id = parseInt(value, 10);
        this.setState({controller: id});
    }

    render() {
        const {controller} = this.state;

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
                    <label>Controller Type</label>
                    <br/>
                    <select
                        value={controller}
                        onChange={this.onOptionChange}
                    >
                        <option type="number" value={0} key={0}>Keyboard</option>
                        <option type="number" value={1} key={1}>Webcam</option>
                    </select>
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