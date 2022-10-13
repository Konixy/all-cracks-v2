import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "./config";

export default class Games extends Component {
  constructor() {
    super();
    this.state = {
      games: [],
    };
  }
  componentDidMount() {
    this.loadGames()
  }
  loadGames = () => {
    fetch(`${config.backendPath}/api/games`)
    .then(r => r.jspn())
    .then(r => console.log(r))
  }
  render() {
    return (
      <main>
        <div className="container">
          {this.state.games.length > 0 ? (
            this.state.games.map(e => (
              <div className="game" key={e.name}><Link to={e.href} className="text-md">e.name</Link></div>
            ))
          ) : (
            <>{"Games are loading"}</>
          )}
        </div>
      </main>
    );
  }
}
