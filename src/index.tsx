import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/index.scss";
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import Games from "./Games";
import Game from "./Game";
import NotFound from "./NotFound";
import DMCA from "./DMCA";
import Admin from "./Admin";

interface RouteElement {
  path: string;
  element: () => JSX.Element;
  noHeader?: boolean;
  noFooter?: boolean;
}

const routes: RouteElement[] = [
  { path: "/", element: Home },
  {
    path: "/games",
    element: Games,
  },
  {
    path: "/game/:gameId",
    element: Game,
  },
  {
    path: "/dmca",
    element: DMCA,
  },
  {
    path: "/admin",
    element: Admin,
  },
  {
    path: "*",
    element: NotFound,
    noFooter: true,
  },
];

class App extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <>
                  {route.noHeader ? <></> : <Header path={route.path} />}
                  <route.element />
                  {route.noFooter ? <></> : <Footer />}
                </>
              }
            />
          ))}
        </Routes>
      </Router>
    );
  }
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
