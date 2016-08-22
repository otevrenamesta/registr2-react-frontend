import React from 'react';
import { browserHistory } from 'react-router';

import DocumentForm from '../components/forms/document';
import DocumentContent from '../components/forms/content';

class CreateView extends React.Component {

  componentDidMount() {
    this.props.state.loadCreateData('contract');
  }

  updateField(name) {
    return (e) => {
      e.preventDefault();
      this.props.state.updateData(name, e.target.value);
    }
  }

  save(e) {
    e.preventDefault();
    if(this.props.state.validateData()) {
      this.props.state.saveData().then(this.onCreated.bind(this));
    }
  }

  onCreated(created) {
    alert('ok, document created:\n' + JSON.stringify(created))
    browserHistory.push('/')
  }

  render() {
    const entityName = 'contract';

    return (
      <div className="medium-12 columns">
        <h1>{'Create new ' + entityName}</h1>

        <form onSubmit={this.save.bind(this)}>

          <div className="row">
            <div className="medium-6 columns">
              <DocumentForm updateField={this.updateField.bind(this)} />
            </div>

            <div className="medium-6 columns">
              <DocumentContent />
            </div>
          </div>

          <div className="row">
            <div className="small-12 columns">
              <button type="submit" className="success button">
                save
              </button>
            </div>
          </div>

        </form>
      </div>
    );
  }
}

export default CreateView;
