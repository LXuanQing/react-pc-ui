import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import { Component } from 'react';
import { render } from 'react-dom';
import Animate from 'pages/Animate';
import Totop from 'pages/Totop';
import Dialog from 'pages/Dialog';
import Album from 'pages/Album';
import Pagination from 'pages/Pagination';
import './app.less';

render(
	<Router>
		<div className="demo-root">
			<Switch>
				<Route exact path="/" component={Pagination} />
			</Switch>
		</div>
	</Router>,
	document.getElementById('App'),
);
