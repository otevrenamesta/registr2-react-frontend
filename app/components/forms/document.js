import React from 'react';
import { observer } from 'mobx-react';

import ResponsiblePersons from "./responsible_persons";

@observer
class DocumentForm extends React.Component {

  static contextTypes = {
    state: React.PropTypes.object.isRequired
  }

  render() {
    return (
      <div>
        <label>title
          <input type="text" placeholder="Zadej nazev dokumentu" />
        </label>

        <label>responsible persons
          <ResponsiblePersons name="respPersns" />
        </label>
      </div>
    );
  }
}

export default DocumentForm;
