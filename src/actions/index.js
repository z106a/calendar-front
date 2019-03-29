import axios from 'axios';

const setRange = (e, id) => {
  return {
    type: 'SET_RANGE',
    range: e.target.textContent,
    id: id
  }
}
const setMinute = (id, minute) => (dispatch, getState) => {
  const state = getState();
  if (state.getIn(['timelist', id, 'isSelected'])) return;
  const element = state.getIn(['timelist', id, 'minutes', 'lst']).find(el => el.get('time') === minute);
  if (element) {
    if (element.isSelected) return state;
    dispatch({type: 'REMOVE_MINUTE', id, minute});
    dispatch({type: 'SET_HOUR_NOT_ADDED', id});
    return;
  } else {
    dispatch({type: 'ADD_MINUTE', id, minute});
    dispatch({type: 'SET_HOUR_ADDED', id});
  }
  
}
const setHour = (id) => (dispatch, getState) => {
  const state = getState();
  const element = state.getIn(['timelist', id]);
  if (element.getIn(['minutes', 'lst']).size > 0 ) return;
  return element.get('isAdded') ?
    dispatch({type: 'SET_HOUR_NOT_ADDED', id}) :
    dispatch({type: 'SET_HOUR_ADDED', id});
}

const getTimeByDate = (date) => (dispatch, getState) => 
  axios.get(`/time/${date}`)
  .then(({data}) => {
    dispatch({type: "FETCH_DATA", payload: data});
  });

const changeSubmitLoadingStatus = () => ({type: 'SET_SUMBIT_LOADING'});
const submitSchedule = (date) => (dispatch, getState) => {
  dispatch(changeSubmitLoadingStatus());  
  const state = getState(); 
  const data = [...state
  .get('timelist')
  .filter(el => el.get('isAdded') === true)
  .values()].map(el => el.toJS());
  if (data.length) {
    axios.post('/time/add', {data, date})
      .finally(() => dispatch(changeSubmitLoadingStatus()));
  } else {
    dispatch(changeSubmitLoadingStatus());
  }
}

const showMinutes = (id) => ({type: 'SET_SHOW_MINUTES', id});

export {
  setRange,
  getTimeByDate,
  setMinute,
  setHour,
  submitSchedule,
  showMinutes
}