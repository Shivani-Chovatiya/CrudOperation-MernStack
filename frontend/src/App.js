import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Dashboard from "./Screens/Dashboard";
import AdminScreen from "./Screens/AdminScreen";
// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Route path="/" component={Login} exact />
      <Route path="/register" component={Register} exact />
      <Route path="/admin" component={AdminScreen} />
      {/* <Route path="/" component={Dashboard} exact /> */}
    </Router>
  );
}

export default App;
