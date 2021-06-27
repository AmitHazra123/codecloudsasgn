import * as types from './actionTypes';
import {beginAjaxCall, beginCheckForAttributes,checkForAttributesSuccess,checkForAttributesFailure} from './ajaxStatusActions';
import {api} from '../utilities';

export function loadAttributesSuccess(attributes) {
  return { type: types.GET_ALL_ATTRIBUTES_SUCCESS, attributes};
}

export function loadNextPageAttributesSuccess(attributes) {
  return { type: types.GET_NEXT_PAGE_ATTRIBUTES_SUCCESS, attributes };
}

export function setTotalNumberOfAttributes(totalAttributes) {
  return { type: types.SET_TOTAL_NUMBER_OF_ATTRIBUTES, totalAttributes };
}

export function decrementTotalNumberOfAttributes(numberOfAttributes) {
  return { type: types.DECREMENT_TOTAL_NUMBER_OF_ATTRIBUTES, numberOfAttributes };
}

export function createAttributeSuccess(attribute) {
  return {type: types.CREATE_ATTRIBUTE_SUCCESS, attribute};
}

export function updateAttributeSuccess(attribute) {
  return {type: types.UPDATE_ATTRIBUTE_SUCCESS, attribute};
}

export function deleteAttributeSuccess(attribute) {
  return {type: types.DELETE_ATTRIBUTE_SUCCESS, attribute};
}

export function loadAttributes(oParams) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    dispatch(beginCheckForAttributes());
    const skip = oParams.skip;
    const limit = oParams.limit;

    return fetch(api.BASE_URL+api.GET_ALL_ATTRIBUTES+"?"+"skip="+skip+"&"+"limit="+limit, {
      method: 'get',
      headers: {
        "Content-type": "application/json",
        'Accept':  'application/json'
      },
      credentials: 'include'
    }).then(function(response) {
    return response.json();
    })
    .then(function(data) {
      if(data.error){
        throw data.error.message;
      }
      dispatch(setTotalNumberOfAttributes(data.count));
      dispatch(checkForAttributesSuccess());
      return skip === 0 ? dispatch(loadAttributesSuccess(data.attributes)) : dispatch(loadNextPageAttributesSuccess(data.attributes));
    })
    .catch(function(error) {
      dispatch(checkForAttributesFailure());
      throw error;
    });
  };
}

export function createAttribute(attribute) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return fetch(api.BASE_URL + api.CREATE_ATTRIBUTE, {
      method: 'post',
      headers: {
        "Content-type": "application/json",
        'Accept':  'application/json'
      },
      credentials: 'include',
      body:JSON.stringify(attribute)
    }).then(function(response) {
      return response.json();
    })
    .then(function(data) {
      if(data.error){
        throw data.error.message;
      }
      dispatch(createAttributeSuccess(data));
      return data;
    })
    .catch(function(error) {
      throw error;
    });
  };
}

export function updateAttribute(attribute) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return fetch(api.BASE_URL + api.UPDATE_ATTRIBUTE + attribute._id, {
      method: 'put',
      headers: {
        "Content-type": "application/json",
        'Accept':  'application/json'
      },
      credentials: 'include',
      body:JSON.stringify(attribute)
    }).then(function(response) {
      return response.json();
    })
    .then(function(data) {
      if(data.error) throw data.error.message;
      dispatch(updateAttributeSuccess(data));
      return data;
    })
    .catch(function(error) {
      throw error;
    });
  };
}

export function deleteAttribute(attributeId) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return fetch(api.BASE_URL + api.DELETE_ATTRIBUTE + attributeId, {
      method: 'delete',
      headers: {
        "Content-type": "application/json",
        'Accept':  'application/json'
      },
      credentials: 'include'
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
        if(data.error) throw data.error.message;
      dispatch(decrementTotalNumberOfAttributes(1));
      return dispatch(deleteAttributeSuccess(data));
    }).catch(function(error) {
      throw error;
    });
 };
}