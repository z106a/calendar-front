import React from 'react';
import cardImage from '../../assets/img/noDataGirl.jpeg';

export default ({header, body}) => {
  return (
    <div className="ui container">

    <div className="ui divided items">
      <div className="item">
        <div className="ui tiny image">
         <img src={cardImage} alt="nodata"/>
        </div>
        <div className="middle aligned content"><div className="ui message">
  <div className="header">
    {header}
  </div>
  <p>{body}</p>
</div>
        </div>
      </div>
    </div>
    </div>
  );
}

