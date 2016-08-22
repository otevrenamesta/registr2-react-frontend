import React from 'react';
import { observer } from 'mobx-react';

import ResponsiblePersons from "./responsible_persons";

@observer
class DocumentForm extends React.Component {

  static contextTypes = {
    state: React.PropTypes.object.isRequired
  }
  static propTypes = {
    updateField: React.PropTypes.func
  }

  render() {
    const errs = this.context.state.errors
    return (
      <div>
        <label>title
          <input type="text" placeholder="Zadej nazev dokumentu"
            onChange={this.props.updateField('Title')}
            value={this.context.state.values.Title} />
        </label>
        { errs.Title ? <span className="form-error is-visible">{errs.Title}</span> : null }

        <label>responsible persons
          <ResponsiblePersons name="respPersns" />
        </label>
        { errs.ResponsiblePersons ? <span className="form-error is-visible">{errs.ResponsiblePersons}</span> : null }
      </div>
    );
  }
}

export default DocumentForm;
