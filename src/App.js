import Home from "./Home";
import { Route,Switch,BrowserRouter as Router } from "react-router-dom";
import Edit from "./Edit";
import NotFound from "./NotFound";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path='/row/:id'>
              <Edit />
            </Route>
            <Route path='*'>
              <NotFound />
            </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
