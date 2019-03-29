import { fromJS } from 'immutable';
import { createReducer } from 'redux-create-reducer';
const initialState = fromJS({isSubmitLoading: false, showMinutes: false});

const SET_SUMBIT_LOADING = (state) => state.set('isSubmitLoading', !state.get('isSubmitLoading'));

export default createReducer(initialState, {
  SET_SUMBIT_LOADING
});
