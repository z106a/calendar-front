import { combineReducers } from 'redux-immutable';
import apiReducer from './apiReducer';
import appReducer from './appReducer';

// const combineReducers = reducer => {
//   return (state = {}, action) => {
//     const keys = Object.keys(reducer);
//     const nextReducers = {};
//     for (let i = 0; i < keys.length; i++) {
//       const invoke = reducer[keys[i]](state[keys[i]], action);
//       nextReducers[keys[i]] = invoke;
//     }
//     return nextReducers;
//   };
// };

const rootReducer = combineReducers({
  timelist: apiReducer,
  app: appReducer
}); 
// const appReducer = (state, action) => {
//   switch (action.type) {
//     case 'FETCH_DATA':
//       // const current = {...state.timelist, 
//       //   minutes: {...state.timelist.minutes, 
//       //     lst: [...state.timelist.minutes.lst.map(el => ({...el}))]}};
//       console.log(action.payload)  
//       return {
//         ...state,
//         timelist: state.timelist
//       };
//     case 'ADD_ITEM':
//       return {
//         ...state,
//         timelist: [...state.timelist.filter(e => e.time !== action.item.time), action.item],
//         currSelectedHourItem: action.item,
//         interval: action.item.minutes.range || state.interval
//       }
//     case 'DEL_ITEM':
//       return {
//         ...state,
//         timelist: [...state.timelist.filter(e => e.time !== action.item.time)],
//         currSelectedHourItem: null,
//       }
//     case 'SET_CURSELECTITEM':
//       return {
//         ...state,
//         currSelectedHourItem: action.item,
//         interval: action.item.minutes.range || state.interval,
//         showMinutes: true
//       }
//     case 'ADD_MINUTE':
//       return {
//         ...state,
//         currSelectedHourItem: action.item,
//         timelist: [...state.timelist.filter(e => e.time !== action.item.time), action.item],
//       }
//     case 'UPDATE_INTERVAL':
//       return {
//         ...state,
//         interval: Number(action.payload)
//       }
//     case 'SHOW_MINUTES':
//       console.log('show minutes')
//       return {
//         ...state,
//         showMinutes: !state.showMinutes
//       }
//     default:
//       return state;
//   }
// }

export default rootReducer;