import * as types from '../actions/actionTypes';
import initialState from './initialState';

export function attributeReducer(state = initialState.attributes, action){
switch(action.type){

  case types.GET_ALL_ATTRIBUTES_SUCCESS:
    return JSON.parse(JSON.stringify(action.attributes));

  case types.GET_NEXT_PAGE_ATTRIBUTES_SUCCESS:
    return state.concat(action.attributes);

  case types.CREATE_ATTRIBUTE_SUCCESS:
    return [
      Object.assign({}, JSON.parse(JSON.stringify(action.attribute))),
      ...state
    ];

  case types.UPDATE_ATTRIBUTE_SUCCESS:{
    let updatedListState = JSON.parse(JSON.stringify(state));
    let updatedListIndex = updatedListState.findIndex(attribute => attribute._id ==  action.attribute._id);

    if (updatedListIndex > -1) {
      let updatedList = action.attribute;
      let attribute = JSON.parse(JSON.stringify(updatedList));
      updatedListState.splice(updatedListIndex,1,updatedList);
      return updatedListState;
    }
    else {
      return state;
    }
  }

  case types.DELETE_ATTRIBUTE_SUCCESS:
    return [
      ...state.filter(attribute => attribute._id !== action.attribute._id)
    ];

  default:
    return state;
}
}

export function totalAttributesCounter(state = initialState.totalAttributes, action) {
  switch(action.type) {
    case types.SET_TOTAL_NUMBER_OF_ATTRIBUTES:
      return action.totalAttributes;

    case types.DECREMENT_TOTAL_NUMBER_OF_ATTRIBUTES:
      return state - action.numberOfAttributes;

    default:
      return state;
  }
}