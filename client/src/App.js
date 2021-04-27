import React, { Fragment } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';
import Users from './containers/Users/Users';
import NewPlace from './containers/NewPlace/NewPlace';
import EditPlace from './containers/EditPlace/EditPlace';
import UserPlaces from './containers/UserPlaces/UserPlaces';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';

const App = () => {
  return (
    <Fragment>
      <div className={'warrper'}>
        <Header />
        <main>
          <Switch>
            <Route path={'/'} component={Users} exact/>
            <Route path={'/new-place'} component={NewPlace}/>
            <Route path={'/edit/:placeId'} component={EditPlace}/>
            <Route path={'/:userId/places'} component={UserPlaces}/>
            <Route path={'/register'} component={Register}/>
            <Route path={'/login'} component={Login}/>
            <Redirect to={'/'}/>
          </Switch>
        </main>
      </div>
    </Fragment>
  );
}

export default App;