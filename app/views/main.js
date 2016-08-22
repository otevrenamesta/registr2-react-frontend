import React from 'react';
import {RouteHandler, Link} from 'react-router';

import DevTools from 'mobx-react-devtools';

import TopBar from './parts/topbar';


class MainView extends React.Component {

  static propTypes = {
    state: React.PropTypes.object.isRequired
  }
  static childContextTypes = {
    state: React.PropTypes.object.isRequired
  }

  getChildContext() {
    return {
      state: this.props.state
    };
  }

  render() {
    let devTools = <DevTools />;
    return (
      <div>
        {devTools}
        <TopBar />
        <br />
        <div className="row">
          {this.props.children}
        </div>
      </div>
    );
  }

}

export default MainView;
