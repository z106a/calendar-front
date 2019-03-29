import React, { useMemo, Fragment, useEffect, useState } from 'react';
import { getState } from '../../state';
import { submitSchedule, getTime } from '../../api';
import HourItem from './items/HourItem';
import MinutesHolder from './MinutesHolder';
import SubmitButton from '../Submit';

// let newObj = JSON.parse(JSON.stringify(obj)); deep clone nested object

export default function DefaultPage({date}) {
  const [{api, timelist}, dispatch] = getState();
  const [isSubmiting, setIsSubmiting] = useState(false);
  console.log(api);
  useEffect(() => {
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth();
    getTime(new Date((m+1) + "/" + '01' + "/" + y), new Date((m+2) + "/" + '01' + "/" + y)).then(({data}) => {
      const buttons = [...document.getElementsByClassName('calendar__customtile')];
      const dayFromServer = data.map(date => new Date(date).toLocaleDateString().split('/')[0]);
      dayFromServer.forEach(day => {
        const elementIdx = buttons.findIndex(el => el.innerText === day);
        if (elementIdx !== -1) {
          buttons[elementIdx].classList.add('hasScheduled');
        }
      })
    });
  }, [date])
  
  
  function onSubmit() {
    setIsSubmiting(true);
    const toSend = timelist.filter((el) => el.isSelected !== true);
    submitSchedule({data: toSend, date: date}).finally(() => setIsSubmiting(false));
  }
  return (
      <Fragment>
          <div className="ui container">
            <div className="ui cards">
              <HoursHolder />
              {/* {items} */}
          </div>
        </div>
          <MinutesHolder />
        <SubmitButton onSubmit={onSubmit} isLoading={isSubmiting} />
      </Fragment>
  );
}

function HoursHolder() {
  const [{timelist}, dispatch] = getState();
  console.log(timelist);
  // function constructItem(value) {
  //   const item = timelist.find(item => item.time === value);
  //   const result = item ? {...item, isAdded: true} : {...new HourItemInterface(), time: value};
  //   return result;
  // }
  function clickHandler(item) {
    if (!item.minutes.lst.length) {
      const nextItem = {...item, isAdded: !item.isAdded};
      const action = nextItem.isAdded ? 'ADD_ITEM' : 'DEL_ITEM';
      dispatch({type: action, item: nextItem});
    } else {
      dispatch({type: 'SET_CURSELECTITEM', item: item});
    }
  }

  return timelist.map((item,idx) => 
    <HourItem 
      key={idx} 
      item={item}
      clickHandler={clickHandler}
    />);
}