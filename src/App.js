import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/screens/Login";
import Header from "./components/screens/Header";
import Home from "./components/screens/Home";
import { useEffect } from "react";
import { getUserAuth } from './actions/index'
import { connect } from "react-redux";

function App(props) {
  useEffect(() => {
    props.getUserAuth();
  },[])

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/home" exact>
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return{};
}
const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
