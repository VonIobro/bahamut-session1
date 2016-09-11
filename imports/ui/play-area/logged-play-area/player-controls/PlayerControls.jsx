import React, {Component} from 'react';

export default class PlayerControls extends Component {
  render() {
    const {user} = this.props;
    return (
      <div>
        {user.username} Controls
      </div>
    );
  }
}

PlayerControls.propTypes = {
  user: React.PropTypes.object,
};
