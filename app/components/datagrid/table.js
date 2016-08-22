import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router';

import Header from './header';

@observer
class Datagrid extends React.Component {

  static contextTypes = {
    state: React.PropTypes.object.isRequired
  }
  static propTypes = {
    fields: React.PropTypes.array.isRequired,
    sortDir: React.PropTypes.string,
    sortField: React.PropTypes.string,
    onSort: React.PropTypes.func.isRequired
  }

  buildHeaders() {
    let headers = [];
    const {fields, sortDir, sortField} = this.props;

    for (let i in fields) {
      const fieldName = fields[i].name;
      let sort = null;

      if (fieldName === sortField) {
        sort = sortDir;
      }

      headers.push(
        <Header
          key={i}
          sort={sort}
          fieldName={fieldName}
          label={fields[i].label}
          onSort={this.props.onSort}
        />
      );
    }

    headers.push(<th key={'actions'}>Actions</th>);

    return headers;
  }

  buildRecords() {
    return this.context.state.found.map((r, i) => (
        <tr key={i}>{this.buildCells(r)}</tr>
    ));
  }

  buildActions() {
    return null;
  }

  buildCells(row) {
    let cells = [];

    for (let i in this.props.fields) {
      const attrName = this.props.fields[i].name;
      const val = row[attrName] || '---';

      cells.push(<td key={i}><Link to={`/show/${row.Type}/${row.id}`}>{val}</Link></td>);
    }

    cells.push(<td key={'datagrid-actions'}>{this.buildActions()}</td>);

    return cells;
  }

  render() {
    return (
        <table className="datagrid">
            <thead>
                <tr>
                    {this.buildHeaders()}
                </tr>
            </thead>
            <tbody>
                {this.buildRecords()}
            </tbody>
        </table>
    );
  }
}

export default Datagrid;
