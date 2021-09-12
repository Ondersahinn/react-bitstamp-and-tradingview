import React, { Suspense, lazy} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { useHistory } from "react-router";
import './App.css';

function App() {

  const hist= useHistory();
  const Home = lazy(() => import('./components/Layout/Home'));
  return (
    <div className="App">
      <Router history={hist}>
        <Switch>
          <Suspense fallback={'loading'}>
              <Route exact path="/" component={Home} />
          </Suspense>
          </Switch>
      </Router>
    </div>
  );
}



export default App;
