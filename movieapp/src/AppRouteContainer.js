import React from "react";
import { connect } from "react-redux";
import { loadLoggedInUserAction } from "./store/reducers/user";
import {
    Redirect
  } from "react-router-dom";

class AppRouteContainer extends React.Component {
  componentDidMount() {
    this.props.dispatch(loadLoggedInUserAction());
  }

  componentDidUpdate(prevProps) {
    const { fetchingUserSession, isLoggedIn } = this.props;
    if (!fetchingUserSession && !isLoggedIn) {
      // redirect to login route if not already there
      
    }
  }

  render() {
    if (this.props.isLoggedIn) {
      return <>{this.props.children}</>;
    } else if (this.props.fetchingUserSession) {
      return <div>fetching user...</div>;
    } else {
      return <Redirect to="/login" />;
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.user.isLoggedIn,
    fetchingUserSession: state.user.fetchingUserSession
  };
}

export default connect(mapStateToProps, null)(AppRouteContainer);
