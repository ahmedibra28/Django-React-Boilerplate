import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      error.msg.non_field_errors && alert.error(error.msg.non_field_errors);
      error.msg.username && alert.error(error.msg.username);
      error.msg.old_password && alert.error(error.msg.old_password);
      error.msg.new_password && alert.error(error.msg.new_password);
      error.msg.email && alert.error(error.msg.email);
    }
    if (message !== prevProps.message) {
      message.changePassword && alert.success(message.changePassword);
      message.resetPassword && alert.success(message.resetPassword);
      message.detail && alert.success(message.detail);
    }
  }

  render() {
    return <Fragment />;
  }
}
const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});
export default connect(mapStateToProps)(withAlert()(Alerts));
