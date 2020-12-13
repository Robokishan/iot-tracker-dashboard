import React, { Component } from 'react';
import Login from './Views/Login/Login'
import Home from './Views/Home/Home'
import Dashboard from './Views/Dashboard/Dashboard'
import Protectedroute from './Views/Auth/Protected'
import {  Switch , Route, withRouter,Redirect } from 'react-router-dom'
import NotFound from './Views/NotFound/NotFound'

class App extends Component {

  constructor(props) {
    super(props);
    this.authenticated = false;
    this.state = {
      redirect: false
    }
  }

  setRedirect = (state) => {
    this.setState({
      redirect: state
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="App-body" >
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route exact path="/dashboard">
          <Redirect to="/dashboard/overview" />
          </Route>
          <Protectedroute path="/dashboard/:dashid" exact component={Dashboard} />
          <Route path="*" component={NotFound} />
        </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
