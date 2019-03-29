import React, {useMemo, memo} from 'react';
import classNames from 'classnames';

function Selector({toggleShow, setRange, children, range}) {  
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
      <div className="or"></div>
      <button className="ui positive button active" onClick={toggleShow}>{children}</button>
    </div>
  );
}

export default memo(Selector);