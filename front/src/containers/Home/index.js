import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeTable from '../../components/HomeTable';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class Home extends Component {
  constructor(...props) {
    super(...props);
  }

        // {/*<ul>{(this.props.reportJson || []).map((item, key) => <HomeTable key={key} item={item} />)}</ul>*/}
  render() {
    debugger
    return (
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
            (this.props.reportJson || []).map((item, key) => (
                <HomeTable key={key} item={item} />
              ))
          }
        </tbody>
      </Table>

    )
  }
}
const mapStateToProps = state => {
  return {
    reportJson: state.auth.reportJson && state.auth.reportJson.addReportJson,
  };
};

export default connect(mapStateToProps,)(Home);