import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';

import Aux from '../../hoc/Aux/Aux';

class HomeTable extends Component {
  constructor( props ) {
    super(props);
  }

  render() {
    const keys = Object.keys(this.props.item);
    let keys3 = keys;
    return (
      <tr>
        {
          keys3.map(key => (
            <td key={key}>
              {this.props.item[key]}
            </td>
          ))
        }
      </tr>

    );
  }
}

export default HomeTable;