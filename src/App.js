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

const store = createStore(reducer,applyMiddleware(logger))




const App = () => (
    <Provider store={store}>
        <HashRouter>
            <div>
                <ul>
                    <li><Link to="/matches">matches</Link></li>
                    <li><Link to="/">players</Link></li>
                </ul>
                <hr/>

                <Route exact path="/" component={Players}/>
                <Route path="/matches" component={Matches}/>
            </div>
        </HashRouter>


    </Provider>
);

export default App;