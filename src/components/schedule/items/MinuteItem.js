import React, { memo } from 'react';
import classNames from 'classnames';

function MinuteItem({item, clickHandler, currHourItem}) {
  function passHandler() {
    clickHandler(item);
  }
  const itemClass = classNames({
    card: true,
    item:true, 
    'item-disabled': item.isSelected || !currHourItem,
    'item-added': item.isAdded,
  });
  return (
    <div className={itemClass} onClick={passHandler}>
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

export default memo(MinuteItem);