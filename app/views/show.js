import React from 'react';
import { browserHistory } from 'react-router';

import DocumentForm from '../components/view/document';
import DocumentContent from '../components/view/content';

class ShowView extends React.Component {

  componentDidMount() {
    this.props.state.loadItemData('contract', this.props.routeParams.id)
  }

  render() {
    return (
      <div className="medium-12 columns">

        <div className="row">
          <div className="medium-6 columns">
            <DocumentForm />
          </div>

          <div className="medium-6 columns">
            <DocumentContent />
          </div>
        </div>

      </div>
    );
  }
}

export default ShowView;
