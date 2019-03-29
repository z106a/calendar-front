import axios from 'axios';
import { fromJS, Map, List } from 'immutable';

export function getTime(gtMonthDate, ltMonthDate) {
  return axios.get(`/time/all/${gtMonthDate}/${ltMonthDate}`);
}

export function submitSchedule({data, date}) {
  return axios.post('/time/add', {data, date})
}
export function submitUserSelectedItem(item) {
  return axios.post('http://localhost:3100/time/select', item);
}
// const hoursList = (function generateHoursList() {
//   const list = [];
//   for (let i = 10; i < 20; i++) {
//     list.push(`${i}:00 - ${i + 1}:00`);
//   }
//   return list;
// })();

export function generateMinutesList(interval) {
  console.log(interval);
  const list = [];
  const range = Number(interval);
  for(let i=0; i<60; i+=range) {
    list.push(`${i} - ${i+range}`);
  }
  return list;
}
 function *generateHours() {
  for (let i = 10; i < 20; i++) {
    yield `${i}:00 - ${i + 1}:00`;
  }
}
export const generateHoursLabels = (function () {
  const list =[];
  for (let i = 10; i < 20; i++) {
    list.push(`${i}:00 - ${i + 1}:00`);
  }
  return list;
})();
const hoursList = (() => {
  const list = {};
  const generator = generateHours();
  for (let timeValue of generator) {
    fromJS(list[timeValue] = Map(new HourItemClass(timeValue)));
  }
  return list;
})();

export function createTimeList() {
  return hoursList;
}

function HourItemClass(time) {
  this.isSelected = false;
  this.isAdded = false;
  this.time = time;
  this.showTime = false;
  this.minutes = Map({
    lst: List([]),
    range: 15
  })
}

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}





