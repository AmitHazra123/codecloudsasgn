import * as types from '../actions/actionTypes';
import initialState from './initialState';

export function ajaxCallsInProgressReducer(state = initialState.ajaxCallsInProgress, action){
  let ajaxCallsInProgress = {...state};
  switch(action.type){
    case types.CHECKING_FOR_ATTRIBUTES:
      ajaxCallsInProgress.checkingForAttribute = true;
      return Object.assign({}, ajaxCallsInProgress);
      break;
    case types.CHECKING_FOR_ATTRIBUTES_SUCCESS:
      ajaxCallsInProgress.checkingForAttribute = false;
      return Object.assign({}, ajaxCallsInProgress);
      break;
    case types.CHECKING_FOR_ATTRIBUTES_FAILURE:
      ajaxCallsInProgress.checkingForAttribute = false;
      return Object.assign({}, ajaxCallsInProgress);
      break;
    default:
      return state;
  }
}
