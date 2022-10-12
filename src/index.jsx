import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/index.scss";
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import Games from "./Games";

const routes = [
  { path: "/", element: Home, withHeader: true, withFooter: true },
  {
    path: "/games",
    element: Games,
    withHeader: true,
    withFooter: true,
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
              exact
              path={route.path}
              element={
                <>
                  {route.withHeader ? <Header path={route.path} /> : <></>}
                  <route.element />
                  {route.withFooter ? <Footer /> : <></>}
                </>
              }
            />
          ))}
          <Route path="*" element={<><Header />404<Footer /></>} />
        </Routes>
      </Router>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
