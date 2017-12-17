import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as actions from '../actions/index';
import {Button} from 'react-bootstrap';

class Players extends Component {

    addPlayer = () => {
        const value = this.input.value;
        this.props.actions.addPlayer(value);
    }

    render() {
        let display = <div></div>;

        return (<div>
                <input className="col-lg-2" ref={node => this.input = node} type="text"/>

                <Button className="btn-success btn col-lg-1" onClick={this.addPlayer}>Add player</Button>

                <table className="table table-bordered top">
                    <thead>
                    <tr>
                        <th>Winner</th>
                        <th>Nr. wins</th>
                        <th>Rate</th>
                    </tr>
                    </thead>
                    {
                        this.props.players.map
                        (
                            (player, index) => (
                                <tr key={index}>
                                    <td>{player.name}</td>
                                    <td>{player.nrWins}</td>
                                    <td> {player.nrGames !== 0 ? Math.round(player.nrWins / player.nrGames * 100) : 0}%</td>
                                </tr>
                            )
                        )
                    }
                </table>
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        players: state.players
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Players)
