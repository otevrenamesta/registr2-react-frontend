import React from 'react';

class Header extends React.Component {

  static propTypes = {
    fieldName: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    sort: React.PropTypes.string,
    onSort: React.PropTypes.func
  }

  onSort(sortDir) {
    return () => {
      this.props.onSort(this.props.fieldName, sortDir);
    };
  }

  render() {
    const { sort, fieldName, label, onSort } = this.props;
    let element = <span>{label}</span>;

    if (onSort) {
        let sortIcon = null;
        if (sort) {
            sortIcon = <span className={`sorted sorted-${sort.toLowerCase()}`}></span>;
        }
        const sortDir = 'ASC' === sort ? 'DESC' : 'ASC';

        element = <a onClick={this.onSort(sortDir)}>{sortIcon}{label}</a>;
    }

    return (
      <th className={`react-admin-column-${fieldName}`} key={fieldName}>
          {element}
      </th>
    );
  }
}

export default Header;
