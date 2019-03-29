import React, { memo, useState, useEffect } from 'react';
import classNames from 'classnames';

function HourItem({item, clickHandler}) {  
  console.log(item);
  const className = classNames({
    card: true,
    item:true, 
    'item-disabled': item.isSelected,
    'item-added': item.isAdded,
    'item-with-minutes': item.minutes && item.minutes.lst.length > 0,
  });
  function handlerClick() {
    clickHandler(item);
  }
  return (
    <div className={className} onClick={handlerClick}>
      <div className="content">
        <div className="header">
          {item.time}            
        </div>
      </div>
      {item.name && (
        <div className="content">
          <div className="ui small feed">
            <div className="event">
              <div className="content">
                <div className="summary">
                {item.surname} {item.name} {item.phone}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(HourItem);


