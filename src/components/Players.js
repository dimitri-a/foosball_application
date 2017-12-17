import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as actions from '../actions/index';

import { Button } from 'react-bootstrap';

let textInput = null;

class Players extends Component {

    addPlayer = () => {
        const value = this.input.value;

        console.log(value);
        this.props.actions.addPlayer(value);

    }

    render() {

        let display = <div></div>;


        if (this.props.players.length > 0) {

            display = this.props.players.map
            (
                (player, index) => (
                    <p key={index}> {player.name} wins: {player.nrWins} <br/>
                        winloss-rate: {player.nrGames !== 0 ? Math.round(player.nrWins / player.nrGames * 100) : 0}%</p>
                )
            )
        }

        console.log('inside players this.props.players=', this.props.players);

        return (<div className="row">
                <label htmlFor="">Name</label>
                <input ref={node => this.input = node} type="text"/>


                <Button className="btn-success btn" onClick={this.addPlayer}>Add player</Button>

                {display}


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
