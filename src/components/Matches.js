import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as actions from "../actions/index";
import {Button} from 'react-bootstrap';

class Matches extends Component {

    constructor(props) {
        super();
        this.props = props;
        this.state = {
            selectedPlayer1: this.props.players[0].name,
            selectedPlayer2: this.props.players[1].name,
            result: []
        }
    }

    winner = (event) => {
        this.props.actions.addMatch(this.state.selectedPlayer1, this.state.selectedPlayer2, event.target.value)
        this.props.actions.addWin(event.target.value);
        this.props.actions.addLoss(event.target.value === this.state.selectedPlayer1 ? this.state.selectedPlayer2 : this.state.selectedPlayer1);
    }

    selectPlayer = (event) => {
        event.target.id === 'p1' ?
            this.setState({selectedPlayer1: event.target.value})
            :
            this.setState({selectedPlayer2: event.target.value})
    }

    versus = () => {
        let display = '';
        let nrWinsPlayer1 = 0;
        let nrWinsPlayer2 = 0;

        //select matches 2 players
        let result = this.props.matches.filter(match => {
                return match.player1 === this.state.selectedPlayer1 && match.player2 === this.state.selectedPlayer2
            || match.player1 === this.state.selectedPlayer2 && match.player2 === this.state.selectedPlayer1

                ;
        })

        result.forEach(
            match => {
                if (match.winner === this.state.selectedPlayer1) {
                    nrWinsPlayer1 = nrWinsPlayer1 + 1;
                }
                if (match.winner === this.state.selectedPlayer2) {
                    nrWinsPlayer2 = nrWinsPlayer2 + 1;
                }
            }
        );

        display =
            <div className="bottom bold">Historical results:
                {this.state.selectedPlayer1} {nrWinsPlayer1}
                {' '+'vs '}{this.state.selectedPlayer2} {nrWinsPlayer2} </div>

        this.state.result = result;

        return display;
    }


    setOptions = () => {
        let options = <option></option>;

        if (this.props.players.length > 0) {
            options = this.props.players.map
            (
                player =>
                    <option value={player.name}> {player.name}</option>
            )
        }
        return options;
    }

    render() {
        let display = '';

        this.setOptions(this.state.selectedPlayer1);
        this.setOptions(this.state.selectedPlayer1);

        display = this.versus();
        return (
            <div>
                {display}
                <div className="">
                    <select className="col-lg-2" id="p1" onChange={this.selectPlayer}
                            value={this.state.selectedPlayer1}>
                        {this.setOptions()}
                    </select>

                    <Button className="btn-success col-lg-1 bottom"
                            disabled={this.state.selectedPlayer1 === this.state.selectedPlayer2} onClick={this.winner}
                            value={this.state.selectedPlayer1}>Win
                    </Button>

                    <select className="col-lg-2" id="p2" onChange={this.selectPlayer}
                            value={this.state.selectedPlayer2}>
                        {this.setOptions()}
                    </select>

                    <Button className="btn-success col-lg-1"
                            disabled={this.state.selectedPlayer1 === this.state.selectedPlayer2} onClick={this.winner}
                            value={this.state.selectedPlayer2}>Win
                    </Button>
                </div>

                <div className="">
                    <table className="table table-bordered top">
                        <thead>
                        <tr>
                            <th>Winner</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        {this.state.result.map(match => {
                                return (<tr>
                                    <td>{match.winner} </td>
                                    <td>{match.dt}</td>
                                </tr>)
                            }
                        )}
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        players: state.players,
        matches: state.matches
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Matches)
