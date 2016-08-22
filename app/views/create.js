import React from 'react';
import { browserHistory } from 'react-router';

import DocumentForm from '../components/forms/document';
import DocumentContent from '../components/forms/content';

class CreateView extends React.Component {

    componentDidMount() {
      this.props.state.loadCreateData(this.props.routeParams.entity);
    }

    updateField(name, value) {
      this.props.state.updateData(name, value);
    }

    save(e) {
      e.preventDefault();
      this.props.state.saveData().then(this.onCreated.bind(this));
    }

    onCreated(dataStore) {
      const entityName = this.props.state.entityName;
      const entry = dataStore.getFirstEntry(this.props.state.view.entity.uniqueId);

      Notification.log('Element successfully created.', {addnCls: 'humane-flatty-success'});

      const to = `/${entityName}/edit/${entry.identifierValue}`;
      browserHistory.push(to);
    }

    buildFields(view, entry, dataStore) {
        let fields = [];
        const values = this.props.state.values;

        for (let field of view.getFields()) {
            const value = values[field.name()];

            fields.push(
                <div className="form-field form-group" key={field.order()}>
                    <Field field={field} value={value} entity={view.entity}
                           values={values} entry={entry}
                           dataStore={dataStore}
                           updateField={this.updateField.bind(this)} />
                </div>
            );
        }

        return fields;
    }

  render() {
    const entityName = 'contract';

    return (
      <div className="medium-12 columns">
        <h1>{'Create new ' + entityName}</h1>

        <form onSubmit={this.save.bind(this)}>

          <div className="row">
            <div className="medium-6 columns">
              <DocumentForm />
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
