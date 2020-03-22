import React from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { addReportJson } from '../../store/actions';

export const SocketContext = React.createContext({
  prices: {}
});

/*for hooks*/
export const useWebsocket = () => React.useContext(SocketContext);

export class WrappedSocketManager extends React.Component {

  state = {
    prices: [],
  };

  socket = null;

  constructor( props ) {
    super(props);

    this.socket = io.connect(process.env.NODE_ENV === 'development'
      ? `http://localhost:3012/`
      : `http://localhost:3012/`
      , {
        transports: ['websocket'],
        rejectUnauthorized: false,
        secure: true
      });

    this.socket.on('new message', payload => {

      // Redux store updates
      this.props.onAddReportJson(payload);

      // Component state updates
      this.setState({
        prices: payload,
      });
    });
  }

  componentWillUnmount() {
    try {
      this.socket !== null && this.socket.disconnect();
    } catch (e) {
      // socket not connected
    }
  }

  render() {
    return (
      <SocketContext.Provider value={{
        prices: this.state.prices
      }}>
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onAddReportJson: ( payload ) => dispatch(addReportJson(payload))
  };
};

export const SocketManager = connect(
  null,
  mapDispatchToProps
)(WrappedSocketManager);

export default SocketManager;