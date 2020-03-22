import React, { Component } from 'react';
import { connect } from 'react-redux';

import HomeTable from '../../components/HomeTable';

import Table from 'react-bootstrap/Table';

import { SocketContext } from '../../hoc/WrappedSocketManager';
import Aux from '../../hoc/Aux/Aux';

class Home extends Component {
  constructor(...props) {
    super(...props);
  }
  static contextType = SocketContext;

  render() {
    debugger
    return (
      <Aux>
        <Table striped bordered hover>
            <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
            </thead>
            <tbody>
            {
              (this.context.prices || []).map((item, key) => (
                <HomeTable key={key} item={item} />
              ))
            }

            {
              (this.props.reportJson || []).map((item, key) => (
                <HomeTable key={key} item={item} />
              ))
            }
            </tbody>
          </Table>
      </Aux>
    )
  }
}
const mapStateToProps = state => {
  return {
    reportJson: state.auth.reportJson && state.auth.reportJson.addReportJson,
  };
};

export default connect(mapStateToProps,)(Home);