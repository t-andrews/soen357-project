import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

const Tabs = lazy(() => import("./components/Tabs"));

function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div><h1>Loading page ...</h1></div>}>
            <Switch>
                <Route exact path="/" component={Tabs} />
            </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
