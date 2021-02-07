import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Home from "./layout/Home/Home";
import Pending from "./layout/Pending/Pending";
import Create from "./layout/Create/Create";

import Header from "./components/Header/Header";

function App() {
  const menus = [
    { text: "Home", link: "home" },
    { text: "Pending Transaction", link: "pending" },
    { text: "Create Transaction", link: "create" },
  ];

  return (
    <>
      <BrowserRouter>
        <Header menus={menus} />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/pending" component={Pending} />
          <Route path="/create" component={Create} />
          <Redirect from="/" to="/home" />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
