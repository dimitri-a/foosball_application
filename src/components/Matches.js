import React, {Component} from 'react';
import {connect} from 'react-redux';
import FilterLink from "./FilterLink";
import Header from "./Header";
import {bindActionCreators} from "redux";
import * as actions from "../actions/index";
import {getRate} from "../reducers/matches";

class Matches extends Component {

    constructor(props) {
        super();
        this.props = props;
        this.state = {selectedPlayer1: this.props.players[0].name, selectedPlayer2: this.props.players[1].name,result:[]}
    }


    winner = (event) => {
        console.log('event.target.value=', event.target.value);
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
        let nrWinsPlayer1=0;
        let nrWinsPlayer2=0;

//select matches 2 players
        let result = this.props.matches.filter(match => {
            return match.player1 === this.state.selectedPlayer1 && match.player2 === this.state.selectedPlayer2;
        })


console.log('result=',result);

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
        
      
        console.log('nrWinsPlayer1=',nrWinsPlayer1);

        console.log('nrWinsPlayer2=',nrWinsPlayer2);

        display = <span>Game stats:{this.state.selectedPlayer1} {nrWinsPlayer1} wins vs {this.state.selectedPlayer2} {nrWinsPlayer2} wins </span>

        this.state.result = result;

        return display;
    }


    setOptions = () =>{
        let options = <option></option>;

        if (this.props.players.length > 0) {
            options = this.props.players.map
            (
                player =>
                    <option value={player.name}> {player.name}</option>
            )

        }
        console.log('options=', options);

        return options;
    }

    render() {
        let display='';
        console.log('inside matches;this.props.players=', this.props.players);


        this.setOptions(this.state.selectedPlayer1);
        this.setOptions(this.state.selectedPlayer1);

        console.log('this.prips.matches=', this.props.matches);


        let matches = this.props.matches.map(
            match =>
                <div>
                    winner: {match.winner} date: {match.dt}
                </div>
        )

        console.log('this.props.rate=', this.props.rate);

        //todo remove
        debugger;

        display = this.versus();

        return (<div>


                <select id="p1" onChange={this.selectPlayer} value={this.state.selectedPlayer1}>
                    {this.setOptions()}
                </select>

                <button disabled={this.state.selectedPlayer1 ===this.state.selectedPlayer2} onClick={this.winner} value={this.state.selectedPlayer1}>{this.state.selectedPlayer1} wins
                </button>


                <select id="p2" onChange={this.selectPlayer} value={this.state.selectedPlayer2}>
                    {this.setOptions()}
                </select>

                <button disabled={this.state.selectedPlayer1 ===this.state.selectedPlayer2} onClick={this.winner} value={this.state.selectedPlayer2}>{this.state.selectedPlayer2} wins
                </button>

                <br/>

                {display}

                {this.state.result.map( match => {

                        return (<div>winner:{match.winner} || date:{match.dt}</div> )
                    }

                )}



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
