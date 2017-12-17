import React, {Component} from 'react';
import {connect} from 'react-redux';
import FilterLink from "./FilterLink";
import Header from "./Header";
import {bindActionCreators} from "redux";
import * as actions from "../actions/index";

class Matches extends Component {

    constructor(props) {
        super();
        this.props = props;
        this.state ={selectedPlayer1:'',selectedPlayer2:''}
    }


    winner = (event) => {
        console.log('event.target.value=', event.target.value);
        this.props.actions.addMatch(this.state.selectedPlayer1, this.state.selectedPlayer2, event.target.value)
        this.props.actions.addWin(event.target.value);
    }

    selectPlayer = (event) => {

      event.target.id ==='p1' ?
          this.setState({selectedPlayer1:event.target.value})
          :
          this.setState({selectedPlayer2:event.target.value})
    }

    render() {
        console.log('inside matches;this.props.players=', this.props.players);

        let options = <option></option>;

        debugger;
        if (this.props.players.length > 0) {
            options = this.props.players.map
            (
                player =>
                    <option value={player.name}> {player.name}</option>
            )

        }

        console.log('options=', options);
        console.log('this.prips.matches=', this.props.matches);


        let matches = this.props.matches.map(
            match =>
                <div>
                    {match.player1} vs {match.player2}  winner: {match.winner} date: {match.dt}
                </div>
        )

        return (<div>

                <Header/>

                <select id="p1" onChange={this.selectPlayer}>
                    {options}
                </select>

                <button onClick={this.winner} value={this.state.selectedPlayer1}>{this.state.selectedPlayer1} wins</button>


                <select id="p2" onChange={this.selectPlayer}>
                    {options}
                </select>

                <button onClick={this.winner} value={this.state.selectedPlayer2}>{this.state.selectedPlayer2} wins</button>

                <br/>

                {matches}


                {/*<button onClick={this.saveResult}>Save result</button>*/}

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
