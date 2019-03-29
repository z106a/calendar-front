import filter from 'lodash/filter';
import React, {Fragment, useMemo} from 'react';
import { getState } from '../../state';
import { generateMinutesList } from '../../api';
import MinuteItem from './items/MinuteItem';
import Selector from './items/Selector';

const minuteItemProto = {
  isSelected: false,
  isAdded: false,
  time: null
};

export default function MinutesHolder() {
  const [{interval, currSelectedHourItem, showMinutes}, dispatch] = getState();
  console.log(currSelectedHourItem);
  function constructItem(value) {
    const item = currSelectedHourItem && currSelectedHourItem.minutes.lst.find(item => item.time === value);
    return item ? {...item, isAdded: true} : {...minuteItemProto, time: value}
  }
  function toggleShowMinutes() {
    dispatch({
      type: "SHOW_MINUTES"
    });
  }
  function clickHandler(item) {
    if (currSelectedHourItem) {
      const nextItem = {...item, isAdded: !item.isAdded};
      const currSelectedHour = {...currSelectedHourItem};
      currSelectedHour.minutes.range = interval;
      
      currSelectedHour.minutes.lst = nextItem.isAdded ? 
        [...filter(currSelectedHour.minutes.lst, (el) => el.time !== item.time), nextItem] :
        filter(currSelectedHour.minutes.lst, (el) => el.time !== item.time)
      dispatch({
        type: 'ADD_MINUTE',
        item: currSelectedHour
      })
    }
  }
  function onSetInterval(e) {
    if ( (currSelectedHourItem && currSelectedHourItem.minutes.lst.length)) {return;}
    dispatch({
        type: 'UPDATE_INTERVAL',
        payload: e.target.textContent
    });
  }
  const items = useMemo(() => 
    generateMinutesList(interval).map(value => 
      <MinuteItem 
        key={value} 
        item={constructItem(value)} 
        clickHandler={clickHandler}
        currHourItem={currSelectedHourItem}  
      />),
  [interval, currSelectedHourItem]);
  return (
    <Fragment>
      <div style={{textAlign: "center", margin: "2em auto"}}>
      <Selector toggleShow={toggleShowMinutes} setRange={onSetInterval} range={interval}>
        {showMinutes ? 'Спрятать минуты' : 'Показать минуты'}
      </Selector>
      </div>
      <div className="ui container">
        <div className="ui cards">
          {showMinutes && items}
        </div>
      </div>
    </Fragment>
  )
}