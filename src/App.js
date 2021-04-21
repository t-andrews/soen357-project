import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import db_json from "./services/db.json";

const Tabs = lazy(() => import("./components/Tabs"));
const Service = lazy( () => import("./components/Test"));

function App() {
    if (!localStorage.getItem("db")) {
        localStorage.setItem("db", JSON.stringify(db_json));
    }

    return (
        <div className="App">
            <Router>
                <Suspense fallback={<div><h1>Loading page ...</h1></div>}>
                    <Switch>
                        <Route exact path="/" component={Tabs} />
                        <Route exact path="/test" component={Service} />
                        <Route exact path="/reset" component={() => {
                            localStorage.setItem("db", JSON.stringify(db_json));
                            return "Courses have been reset";
                        }} />
                    </Switch>
                </Suspense>
            </Router>
        </div>
    );
}

export default App;
