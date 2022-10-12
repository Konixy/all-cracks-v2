import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Games extends Component {
  constructor() {
    super();
    this.state = {
      games: [],
    };
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
