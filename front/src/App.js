import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import SocketManager from './hoc/WrappedSocketManager';

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

const asyncHome = asyncComponent(() => {
  return import('./containers/Home');
});

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/home" component={asyncHome}/>
        <Route path="/auth" component={asyncAuth}/>
        <Redirect to="/home"/>
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/home" component={asyncHome}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/auth" component={asyncAuth}/>
          <Redirect to="/home"/>
        </Switch>
      );
    }

    return (
      <div>
        <SocketManager>
        <Layout>
          {routes}
        </Layout>
        </SocketManager>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
