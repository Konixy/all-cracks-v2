import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.scss";
import Home from './Home'
import Header from "./Header";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="*" element={<>404</>} />
        </Routes>
      </Router>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
