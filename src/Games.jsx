import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "./config";
import ContentLoader from "react-content-loader";
import Tilt from 'react-tilted'

export default class Games extends Component {
  constructor() {
    super();
    this.state = {
      games: [],
      index: 0,
    };
  }
  componentDidMount() {
    this.loadGames();
  }
  loadGames = () => {
    fetch(`${config.backendPath}/api/games`)
      .then((r) => r.json())
      .then((r) => {
        this.setState({ games: r.games });
      });
  };
  sortGames = () => {
    let newGames = [];
    this.state.games.sort(
      (a, b) =>
        new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
    );
    for (let i = this.state.index; i < this.state.index + 10; i++) {
      if (!this.state.games[i]) return;
      newGames.push(this.state.games[i]);
    }
    return newGames;
  };
  render() {
    const loaderParams = {
      width: 180,
      height: 240,
    };
    return (
      <main>
        <div className="container flex flex-col justify-center items-center mt-16 mb-20 last:mb-0">
          {this.state.games.length > 0 ? (
            this.sortGames().map((e) => (
              <div
                className="rounded-lg flex flex-row bg-[#0000002c] w-[850px] h-[240px] mb-5"
                key={e.name}
              >
                <div>
                <Link to={`/game/${e._id}`}>
                  <Tilt max={12.5} speed={400} scale={1.07} reverse={true}>
                    <img
                      src={e.coverUrl}
                      alt={e.name}
                      width="180px"
                      height="240px"
                      className="rounded-lg game-card-img tilt w-[850px] h-[240px]"
                      data-tilt
                    />
                  </Tilt>
                </Link>
                </div>
                <div className="flex flex-col mx-10 my-6">
                  <Link to={`/game/${e._id}`} className="text-lg">{e.name}</Link>
                  <p className="text-sm mt-4 text">{e.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-lg bg-gray-700 w-[850px] h-[240px]">
              <ContentLoader
                speed={2}
                width={loaderParams.width}
                height={loaderParams.height}
                viewBox={`0 0 ${loaderParams.width} ${loaderParams.height}`}
                backgroundColor="#4b5563"
                foregroundColor="#6b7280"
                className="relative outline-none rounded-lg"
              >
                <rect
                  x="0"
                  y="0"
                  width={loaderParams.width}
                  height={loaderParams.height}
                />
              </ContentLoader>
            </div>
          )}
        </div>
      </main>
    );
  }
}
