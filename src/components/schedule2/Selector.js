import React from 'react';
import {connect} from 'react-redux';
import {setRange} from '../../actions';
import classNames from 'classnames';

class SelectorContainer extends React.PureComponent {
  onSetRangeHandler = (e) => {
    this.props.dispatch(setRange(e, this.props.id));
  }
  render() {
    return (
      <Selector {...this.props} setRange={this.onSetRangeHandler} />
    )
  }
}

export default connect()(SelectorContainer);

function Selector({setRange, range}) {
  const buttons = [10, 15, 20, 30].map(val => 
    <button
      key={val}
      className={classNames({ui:true, button:true, 'active': range === val })}
      onClick={setRange}>
      {val}
    </button>
  ); 
  return (
    <div className="ui buttons">
      {buttons}
    </div>
  );
}