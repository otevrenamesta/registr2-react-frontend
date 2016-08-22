import React from 'react';
import Loading from '../../components/loading';
import UserInfo from '../../components/userinfo';
import TopMenu from '../../components/top_menu';

class TopBar extends React.Component {

  render() {
    return (
      <div className="top-bar">
        <div className="row">

          <div className="top-bar-left">
            <TopMenu />
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
