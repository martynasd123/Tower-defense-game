import React, { useState, useEffect } from "react";
import MainContainer from "../components/MainContainer";
import LoginForm from "../components/LoginForm";
import GuestForm from "../components/GuestForm";
import { Redirect } from "react-router";
import { getRoomEndData } from "../api/index"

class GameEnd extends React.Component {
    state = {
        players: null,
        lobbyData: null,
    };
    
    componentDidMount = async () => {
        const response = await getRoomEndData();
        console.log(response);
        this.setState({
            players: response.playerStats,
            lobbyData: response.lobby_data,
        });
    }
    getBackgroundColor = (index) => {
        switch(index) {
            case 0:
                return "#FFD700";
            case 1:
                return "#D3D3D3";
            case 2:
                return "#cd7f32"
            default:
                return "";
        }
    }

    render() {
        const { players } = this.state;
        return (
            <MainContainer py="3" px="4" background>
                <div>
                    <h1>Game stats</h1>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Place</th>
                                    <th>Username</th>
                                    <th>Kills</th>
                                    <th>Damage</th>
                                    <th>Health Left</th>
                                </tr>
                                {players?.sort((a, b) => 100*(b.stats.health_left - a.stats.health_left) + (b.stats.total_damage - a.stats.total_damage) ).map((player, index) => (
                                    <tr key={`tr-${index}`} style={{backgroundColor: this.getBackgroundColor(index)}}>
                                       <td>
                                            {`#${index + 1}`}
                                        </td>
                                        <td>
                                            {player?.user?.username}
                                        </td>
                                        <td>
                                            {player?.stats?.total_kills}
                                        </td>
                                        <td>
                                            {player?.stats?.total_damage}
                                        </td>
                                        <td>
                                            {player?.stats?.health_left}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </div>
            </MainContainer>
        );
    }
}

export default GameEnd