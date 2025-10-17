import React from 'react';
import Widget from 'app/components/Widget';

class FeedRateOverride extends React.PureComponent {
  state = {
    feedRate: 100
  };

  sendCommand = (cmd) => {
    const { actions } = this.props;
    if (actions && typeof actions.sendGcode === 'function') {
      actions.sendGcode(cmd);
      console.log('Sent:', cmd);
    }
  };

  updateFeedRate = (delta) => {
    this.setState(prevState => {
      const newRate = Math.max(10, Math.min(200, prevState.feedRate + delta));
      this.sendCommand(`M220 S${newRate}`);
      return { feedRate: newRate };
    });
  };

  resetFeedRate = () => {
    this.setState({ feedRate: 100 }, () => {
      this.sendCommand('M220 S100');
    });
  };

  render() {
    const { feedRate } = this.state;

    return (
      <Widget title="Feed Rate Override">
        <div style={{ padding: '10px' }}>
          <div className="form-group">
            <button className="btn btn-default" onClick={() => this.updateFeedRate(-10)}>-</button>
            <button className="btn btn-default" onClick={this.resetFeedRate} style={{ margin: '0 10px' }}>Reset</button>
            <button className="btn btn-default" onClick={() => this.updateFeedRate(10)}>+</button>
            <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
              Feed: {feedRate}%
            </span>
          </div>
        </div>
      </Widget>
    );
  }
}

export default FeedRateOverride;
