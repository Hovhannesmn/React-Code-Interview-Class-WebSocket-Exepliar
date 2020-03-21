import React, { Component } from 'react';

class HomeTable extends Component {
  constructor( props ) {
    super(props);
  }

  render() {
    const keys = Object.keys(this.props.item);
    return (
      keys.map(key => (
        <li key={key}>
          {this.props.item[key]}
        </li>
      ))
    );
  }
}

export default HomeTable;