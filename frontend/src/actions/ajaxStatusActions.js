import * as types from './actionTypes';

export function beginAjaxCall() {
  return {type: types.BEGIN_AJAX_CALL};
}

export function ajaxCallError() {
  return {type: types.AJAX_CALL_ERROR};
}

//attributes
export function beginCheckForAttributes() {
  return {type: types.CHECKING_FOR_ATTRIBUTES};
}

export function checkForAttributesSuccess() {
  return {type: types.CHECKING_FOR_ATTRIBUTES_SUCCESS};
}

export function checkForAttributesFailure() {
  return {type: types.CHECKING_FOR_ATTRIBUTES_FAILURE};
}