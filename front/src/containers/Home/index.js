import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeTable from '../../components/HomeTable';

class Home extends Component {
  constructor(...props) {
    super(...props);
  }

  render() {
    return (
      <ul>{(this.props.reportJson || []).map((item, key) => <HomeTable key={key} item={item} />)}</ul>
    )
  }
}
const mapStateToProps = state => {
  return {
    reportJson: state.auth.reportJson && state.auth.reportJson.addReportJson,
  };
};

export default connect(mapStateToProps,)(Home);