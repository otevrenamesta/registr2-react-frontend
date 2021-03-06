import React from 'react';
import { observer } from 'mobx-react';

@observer
class Loading extends React.Component {

  static contextTypes = {
    state: React.PropTypes.object.isRequired
  }

  render() {
    if(this.context.state.loading) {
      return (
        <span><i className="fi-clock"></i> LoaDinG ..</span>
      )
    } else {
      return null;
    }
  }

}

export default Loading;
