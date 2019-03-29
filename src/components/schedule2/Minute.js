import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {setMinute} from '../../actions';

class MinuteContainer extends React.Component {
  clickHandler = () => {
    console.log('click')
    this.props.dispatch(setMinute(this.props.id, this.props.label))
  }
  render() {
    return <Minute {...this.props} clickHandler={this.clickHandler} />
  }  
}
export default connect()(MinuteContainer);

function Minute({item, clickHandler, label}) {
  /* if item - this item came from server */
  const classList = classNames({'added': item})
  return (
    <p className={classList} onClick={clickHandler}>
      {label}
    </p>
  );
}