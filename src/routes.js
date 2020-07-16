import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ListMovie from './schenes/List-Pokemon'
import MyMovie from './schenes/My-Pokemon';

class Routes extends Component {
render() {
    return(
			<div>
				<Switch>
					<Route exact path="/" component={ListMovie}/>
					<Route path="/my-movie" component={MyMovie}/>
					<Redirect to="/" />
				</Switch>
			</div>
    );
	}
}

export default Routes;