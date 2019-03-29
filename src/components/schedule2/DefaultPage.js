import React, { Fragment, useEffect, useState } from 'react';
import {connect} from 'react-redux';
import { getTime, generateHoursLabels } from '../../api';
import HourItem from './HourItem';
import {getTimeByDate, submitSchedule} from '../../actions';
import SubmitButton from '../Submit';
import { createSelector } from 'reselect';

// let newObj = JSON.parse(JSON.stringify(obj)); deep clone nested object
const appSelector = (state) => state.get("app");
const isSubmitingSelector = createSelector(
  [appSelector], 
  (app) => app.get('isSubmitLoading')
);
function getReselectState(state) {
  return {
    isSubmiting: isSubmitingSelector(state)
  }
}

class DefaultPageContainer extends React.Component {
  componentDidMount() {
    this.props.dispatch(getTimeByDate(this.props.date))
  }
  componentDidUpdate(prevProps) {
    if (prevProps.date !== this.props.date) {
      this.props.dispatch(getTimeByDate(this.props.date));
    }
  }
  onSubmit = () => {
    this.props.dispatch(submitSchedule(this.props.date));
  }
  render() {
    return <DefaultPage date={this.props.date} isSubmiting={this.props.isSubmiting} onSubmit={this.onSubmit} />
  }
}
export default connect(getReselectState)(DefaultPageContainer);

function DefaultPage({date, isSubmiting, onSubmit}) {
  useSetLabelToCalendar(date);
  return (
      <Fragment>
          <div className="ui container">
            <div className="ui cards">
              <HoursHolder />
          </div>
        </div>
        <SubmitButton onSubmit={onSubmit} isLoading={isSubmiting} />
      </Fragment>
  );
}

function useSetLabelToCalendar(date) {
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
}


function HoursHolder() { 
  return (
    <div className="ui container">
      {generateHoursLabels.map(label => <HourItem key={label} label={label} />)}
    </div>
  );
}



