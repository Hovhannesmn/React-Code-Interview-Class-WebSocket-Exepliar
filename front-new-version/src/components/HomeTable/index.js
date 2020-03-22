import React, { Component } from 'react';

class HomeTable extends Component {
  constructor( props ) {
    super(props);
  }

  render() {
    const keys = Object.keys(this.props.item);
    return (
      <tr>
        {
          keys.map(key => (
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