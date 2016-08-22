import React from 'react';
import {Link} from 'react-router';
import Loading from '../../components/loading';
import UserInfo from '../../components/userinfo';

class TopBar extends React.Component {

  static contextTypes = {
    state: React.PropTypes.object.isRequired
  }

  render() {
    return (
      <div className="top-bar">
        <div className="row">

          <div className="top-bar-left">
            <ul className="menu">
              <li className="menu-text">{Conf.name}</li>
              <li><Link to="/create/contract">create contract</Link></li>
            </ul>
          </div>

          <div className="top-bar-right"><UserInfo /></div>

          <div className="top-bar-right">
            <ul className="menu">
              <li className="menu-text"><Loading  /></li>
            </ul>
          </div>

        </div>
      </div>
    );
  }

}

export default TopBar;
