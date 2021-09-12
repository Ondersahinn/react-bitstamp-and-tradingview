import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import LiveReducer from '../reducers/liveDataReducer'
export default combineReducers({
  liveData:LiveReducer,
  logger: (state = {}, { type }) => {
    if (window.logger) {
      window.logger.info(
        type,
      );
    }
    return state;
  },
  toastr: toastrReducer,
});
