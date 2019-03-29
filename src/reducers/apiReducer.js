import { createTimeList } from '../api';
import { Map, fromJS, toJS} from 'immutable';
import { createReducer } from 'redux-create-reducer';
// const initialState = {timelist: createTimeList(), interval: 15, currSelectedHourItem: null, showMinutes: false};
const initialState = fromJS(createTimeList()).toOrderedMap().sortBy((v,k) => k);

const FETCH_DATA = (_, {payload}) => {
  const incoming = {};
  payload.forEach(val => {
    incoming[val.time] = {...val, isAdded: true, showTime: !!val.minutes.lst.length};
  });
  return initialState.merge(fromJS(incoming));
}
const SET_RANGE = (state, {range, id}) => {
  return state.getIn([id, 'minutes', 'lst']).size === 0 ?
    state.setIn([id, 'minutes', 'range'], range) :
    state;
} 
const REMOVE_MINUTE = (state, {id, minute}) => {
  const list = state
    .getIn([id, 'minutes', 'lst'])
    .filter(minuteItem => minuteItem.get('time') !== minute);
  return state.setIn([id, 'minutes', 'lst'], list);
}
const ADD_MINUTE = (state, {id, minute}) => {
  return state
    .updateIn([id, 'minutes', 'lst'],
     list => list.push(Map({time: minute})));
}
const SET_HOUR_ADDED = (state, {id}) => {
  return state.setIn([id, 'isAdded'], true);
}
const SET_HOUR_NOT_ADDED = (state, {id}) => {
  if (state.getIn([id, 'isSelected'])) return state;
  if (state.getIn([id, 'minutes', 'lst']).size > 0 ) return state;
  return state.setIn([id, 'isAdded'], false)
}
const SET_SHOW_MINUTES = (state, {id}) => state.setIn([id, 'showTime'], !state.getIn([id, 'showTime']));

export default createReducer(initialState, {
  // [fetch_data]: (state, action) => {
  //   const {payload} = action;
  //   return state;
  // }
  FETCH_DATA,
  SET_RANGE,
  SET_HOUR_ADDED,
  SET_HOUR_NOT_ADDED,
  REMOVE_MINUTE,
  ADD_MINUTE,
  SET_SHOW_MINUTES
});
