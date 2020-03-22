import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeTable from '../../components/HomeTable';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.css';

import { SocketContext } from '../../hoc/WrappedSocketManager';
import Aux from '../../hoc/Aux/Aux';

class Home extends Component {
  constructor(...props) {
    super(...props);
  }
  static contextType = SocketContext;


  // {/*<ul>{(this.props.reportJson || []).map((item, key) => <HomeTable key={key} item={item} />)}</ul>*/}
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
              console.log(this.context, "this§contesasfas")
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