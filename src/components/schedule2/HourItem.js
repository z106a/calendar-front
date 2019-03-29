import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import { createSelector } from 'reselect';
import classNames from 'classnames';
import { generateMinutesList } from '../../api';
import Selector from './Selector';
import Minute from './Minute';
import {setHour, showMinutes} from '../../actions';

const timelistSelector = (state) => state.get("timelist");
const singleItemSelector = createSelector(
  timelistSelector,
  (_, props) => props.label, 
  (timelist, id) => timelist.get(id)
);

const getReselectState = (state, props) => ({
  item: singleItemSelector(state, props)
});
  
class HourItemContainer extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    item: ImmutablePropTypes.map.isRequired,
  };
  clickHandler = (e) => {
    e.preventDefault();
    this.props.dispatch(setHour(this.props.label));
  }
  showMinutesClickHandler = () => {
    this.props.dispatch(showMinutes(this.props.label));
  }
  render() {
    return <HourItem 
      item={this.props.item}
      clickHandler={this.clickHandler}
      showMinutesClickHandler={this.showMinutesClickHandler}
      />
  }
}
export default connect(getReselectState)(HourItemContainer);

function HourItem({item, clickHandler, showMinutesClickHandler}) {
  const name = item.get('name');
  const surname = item.get('surname');
  const phone = item.get('phone');
  const timeLabel = item.get('time');
  const minutes = item.get('minutes');
  const showMinutes = item.get('showTime', false);
  const classList = ['header'];
  if (item.get('isAdded')) classList.push('added');
  const descrClassList = ['description'];
  if (showMinutes) descrClassList.push('show');
  return(
    <div className="ui divided items">
      <div className="item">
        <div className="content">
          <a href="l" className={classNames(classList)} onClick={clickHandler}>
            {item.get('time')}
          </a>
          <ShowUserSelectedInfo name={name} surname={surname} phone={phone} />
          <div className={classNames(descrClassList)}>
            {showMinutes && <Minutes items={minutes} timeLabel={timeLabel}/>}
          </div>
          <div className="extra">
            {/* <div className="ui label">IMAX</div> */}
            {/* <div className="ui label"><i className="globe icon"></i> Additional Languages</div> */}
            <div className="ui left floated teal button basic" onClick={showMinutesClickHandler}>Задать минуты</div>
          </div>
        </div>
      </div>
    </div>
  );
}


function Minutes({items, timeLabel}) {
  const range = items.get('range', 15);
  return (
    <Fragment>
      {generateMinutesList(range).map((value, idx) => {
        const item = items.get('lst').find(el => el.get('time') === value); 
        return <Minute 
                key={idx} 
                item={item}
                id={timeLabel} 
                label={value}
                />
      })}
      <Selector range={range} id={timeLabel} />
    </Fragment>
  );
}



function ShowUserSelectedInfo({name, phone, surname}) {
  if (!phone) return (<div className="meta"></div>)
  return ( 
    <div className="meta">
      <span className="cinema">{`${name} ${surname} : ${phone}`}</span>
    </div>
  );
}
