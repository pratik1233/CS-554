import React from 'react';
import logo from './img/download.png';
import './App.css';
import Characters from './components/Characters';
import Comics from './components/Comics';
import Series from './components/Series';
import Home from './components/Home';
import Show from './components/Show';
import Show1 from './components/Show1';
import Show2 from './components/Show2';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const App = () => {

	return (
		<Router>
			<div className='App'>
				<header className='App-header'>
					<img src={logo} className='App-logo' alt='logo' />
					<h1 className='App-title'>Welcome to the Marvel API</h1>
          <br/>
          <Link className='showlink' to='/'>
						Home
					</Link>
					<Link className='showlink ' to='/characters/page/0'>
          Characters
					</Link>
					<Link className='showlink' to='/comics/page/0'>
          Comics
					</Link>
          <Link className='showlink' to='/series/page/0'>
          Series
					</Link>
				</header>
				<br />
				<br />
				<div className='App-body'>
					<Route exact path='/' component={Home} />
					<Route exact path='/characters/page/:page'  component={Characters} />
					<Route exact path='/characters/:id' component={Show} />
    			    <Route exact path='/comics/page/:page' component={Comics}/>
					<Route exact path='/comics/:id' component={Show1} />
                    <Route exact path='/series/page/:page' component={Series} />
					<Route exact path='/series/:id' component={Show2} />
				</div>
			</div>
		</Router>
	);
};

export default App;
