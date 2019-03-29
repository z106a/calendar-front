import React, {createContext, useContext, useReducer} from 'react';
import {Map} from 'immutable';

export const StateContext = createContext();
export const StateProvider = ({reducer, children}) => {
  const initState = reducer(Map({}), {type: '__INIT__'})
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  )
};
export const getState = () => useContext(StateContext);