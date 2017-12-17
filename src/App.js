import {Provider} from 'react-redux';

import React from 'react';
import {applyMiddleware, createStore} from 'redux';
import reducer from './reducers'
import Matches from "./components/Matches";
import Players from "./components/Players";
import {logger} from "redux-logger";
import {
    HashRouter,
    Route,
    Link
} from 'react-router-dom';

import { NavItem } from 'react-bootstrap';

const store = createStore(reducer,applyMiddleware(logger))




const App = () => (
    <Provider store={store}>
        <HashRouter>
            <div className="container">
                <div className="h1 well">Foosball stats</div>


                <nav class="navbar navbar-default" role="navigation">
                    <NavItem><Link to="/matches">Matches</Link></NavItem>
                    <NavItem><Link to="/">Players</Link></NavItem>
                </nav>

                <Route exact path="/" component={Players}/>
                <Route path="/matches" component={Matches}/>
            </div>
        </HashRouter>


    </Provider>
);

export default App;