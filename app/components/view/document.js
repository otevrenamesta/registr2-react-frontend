import React from 'react';
import { observer } from 'mobx-react';

@observer
class DocumentView extends React.Component {

  static contextTypes = {
    state: React.PropTypes.object.isRequired
  }

  render() {
    const data = this.context.state.values
    const respPersns = data.ResponsiblePersons ? data.ResponsiblePersons.map((i) => (<li>{i}</li>)) : null

    return (
      <div>
        <h1>{data.Title + '(contract)'}</h1>

        {data.Description ? (<p>{data.Description}</p>) : null}

        <h4>responsible persons</h4>
        <ul>{respPersns}</ul>

      </div>
    );
  }
}

export default DocumentView;
