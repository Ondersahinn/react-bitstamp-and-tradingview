import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import ReduxToastr from 'react-redux-toastr'
import store from './store';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import App from './App';

const AppToRender = () => (
  <Provider store={store}>
    <App />
    <ReduxToastr
      timeOut={5000}
      preventDuplicates
      position="bottom-left"
      getState={(state) => state.toastr}
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
    />
  </Provider>
);

ReactDOM.render(<AppToRender />, document.getElementById('root'));
