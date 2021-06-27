import {combineReducers} from 'redux';
import {ajaxCallsInProgressReducer as ajaxCallsInProgress} from './ajaxStatusReducer';
import {attributeReducer, totalAttributesCounter} from './attributeReducer';

const appReducer = combineReducers({
  ajaxCallsInProgress,
  attributes: attributeReducer,
  totalAttributes: totalAttributesCounter,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
