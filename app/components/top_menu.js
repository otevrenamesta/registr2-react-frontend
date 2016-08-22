import React from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';

@observer
class TopMenu extends React.Component {

  static contextTypes = {
    state: React.PropTypes.object.isRequired
  }

  render() {
    const usr = this.context.state.loggedUser
    return (
      <ul className="menu">
        <li className="menu-text">{Conf.name}</li>
        {usr ? <li><Link to="/create/contract">create contract</Link></li> : null}
      </ul>
    )
  }

}

export default TopMenu
