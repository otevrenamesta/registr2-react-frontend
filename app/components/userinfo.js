import React from 'react';
import {Link} from 'react-router';
import { observer } from 'mobx-react';

@observer
class UserInfo extends React.Component {

  static contextTypes = {
    state: React.PropTypes.object.isRequired
  }

  doLogout() {
    this.context.state.logout();
  }

  render() {
    if(this.context.state.loggedUser !== null) {
      return (
        <ul className="menu">
          <li className="menu-text">logged as: {this.context.state.loggedUser.name}</li>
          <li><button type="button" className="tiny button" onClick={this.doLogout.bind(this)}><i className="fi-arrows-out"></i> logout</button></li>
        </ul>
      );
    } else {
      return (
        <ul className="menu">
          <li><Link to="/login"><i className="fi-torso"></i> login</Link></li>
        </ul>
      );
    }
  }

}

export default UserInfo;
