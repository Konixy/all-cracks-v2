import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/index.scss";
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import Games from "./Games.tsx";
import Game, { OnGameLoad } from "./Game";

const routes = [
  { path: "/", element: Home },
  {
    path: "/games",
    element: Games,
  },
  {
    path: "/game/:gameId",
    element: Game,
    onLoad: OnGameLoad,
  },
];

class App extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route}
              exact
              path={route.path}
              loader={route.onLoad ? route.onLoad : undefined}
              element={
                <>
                  {route.noHeader ? <></> : <Header path={route.path} />}
                  <route.element />
                  {route.noFooter ? <></> : <Footer />}
                </>
              }
            />
          ))}
          <Route
            path="*"
            element={
              <>
                <Header />
                404
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
