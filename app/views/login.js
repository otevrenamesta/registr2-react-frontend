import React from 'react';
import { browserHistory } from 'react-router';

class LoginView extends React.Component {

  doLogin() {
    const uname = 'gandalf';
    const passwd = '';
    this.props.state.login(uname, passwd);
    browserHistory.push('/');
  }

  render() {
    return (
      <div className="medium-12 columns">
        <input name="uname" type="text" placeholder="username" />
        <input name="pwd" type="password" placeholder="password" />
        <button type="button" className="button" onClick={this.doLogin.bind(this)}>
          <i className="fi-check"></i> login
        </button>
      </div>
    );
  }

}

export default LoginView;
