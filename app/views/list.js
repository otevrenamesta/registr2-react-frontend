import React from 'react';
import { browserHistory } from 'react-router';

import Datagrid from '../components/datagrid/table';
import Pagination from '../components/datagrid/pagination';


class ListView extends React.Component {

  componentDidMount() {
    this.props.state.loadListData('contract');
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.location.query.page !== this.props.location.query.page) {
      this.props.state.updatePage(nextProps.location.query.page);
    } else if(nextProps.location.query.sortField !== this.props.location.query.sortField ||
      nextProps.location.query.sortDir !== this.props.location.query.sortDir) {
      this.props.state.updateSort(nextProps.location.query.sortField, nextProps.location.query.sortDir);
    } else if(nextProps.location.query.search !== this.props.location.query.search) {
      const newFilters = nextProps.location.query.search;
      this.props.state.updateFilters(newFilters ? JSON.parse(newFilters) : {});
    }
  }

  initFilters(viewFilters) {
    return;
    let selected = viewFilters.filter(filter => filter.pinned());

    const search = this.props.location.query.search || {};
    Object.assign(search, selected);
    if(search.length > 0) {
      this._changeQuery({search: search});
    }
  }

  showFilter(filter) {
    this.props.state.showFilter(filter);
  }

  hideFilter(filter) {
    // just set the filter query to null -> new props -> state:updateFilters
    this.updateFilterField(filter.name(), null);
  }

  updateFilterField(name, value) {
    let query = this.props.location.query || {};
    let search = query.search ? JSON.parse(query.search) : {};

    if ('string' === typeof value && !value.length) {
      value = null;
    }

    let hasModification = false;
    if (value !== null && value !== undefined) {
      search[name] = value;
      hasModification = true;
    } else if (name in search) {
      delete search[name];
      hasModification = true;
    }

    if (0 === Object.keys(search).length) {
      return this._changeQuery({search: null});
    }

    if (hasModification) {
      this._changeQuery({search: search});
    }
  }

  onListSort(field, dir) {
    this._changeQuery({sortDir: dir, sortField: field});
  }

  _changeQuery(newquery) {
    let query = Object.assign({}, this.props.location.query || {});
    for(let k in newquery) {
      if(newquery[k] === null) { // removal
        delete query[k]
      } else {
        query[k] = newquery[k]; // adding
      }
    }
    const serialized = Object.keys(query).reduce( (a,k) => {
      const val = typeof query[k] === 'object' ?
        JSON.stringify(query[k]) : encodeURIComponent(query[k]);
      a.push(k + '=' + val);
      return a
    }, []).join('&');

    // TODO: use https://github.com/reactjs/react-router/blob/master/docs/API.md#createpathpathorloc-query

    browserHistory.push(`${this.props.location.pathname}?${serialized}`);
  }

  onPageChange(page) {
    this._changeQuery({page: page});
  }

  buildPagination() {
    const totalItems = this.props.state.totalItems;
    const page = +this.props.state.page;

    return <Pagination totalItems={totalItems} page={page}
      perPage={this.props.state.perPage} onChange={this.onPageChange.bind(this)} />;
  }

  buildFilters() {
    if (this.props.state.visibleFilters.length > 0) {
      return (
        <Filters
          filters={this.props.state.visibleFilters}
          values={this.props.state.filterValues}
          dataStore={this.props.state.dataStore}
          hideFilter={this.props.hideFilter}
          updateField={this.props.updateFilterField} />
      );
    }
  }

  render() {
    // const filters = this.buildFilters();
    const fields = [
      {name: 'Type', label: 'Typ'},
      {name: 'Title', label: 'Nazev'},
      {name: 'Publisher', label: 'Vydal'}
    ];

    return (
      <div className="medium-12 columns">
        <Datagrid onSort={this.onListSort.bind(this)} fields={fields} sortInfo={this.props.state} />
        {this.buildPagination()}
      </div>
    );
  }
}

export default ListView;
