import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "./config";
import ContentLoader from "react-content-loader";
import Tilt from "react-tilted";
import axios, { AxiosResponse } from "axios";
import { classNames } from "./Util";
import Tooltip from "react-simple-tooltip";

interface Game {
  _id: string;
  name: string;
  release: string;
  releaseDate: string;
  lastUpdate: string;
  lastUpdateDate: string;
  description?: string;
  tutorial?: string;
  bgUrl?: string;
  coverUrl?: string;
  videoId?: string;
  crackDlLink?: string;
  crackDlSize?: string;
  crackDlLinkType?: string;
  isOnline?: string;
  additionalLinks: AdditionnalLink[];
}

interface AdditionnalLink {
  name: string;
  link: string;
  linkType?: "rar" | "torrent";
}

interface APIResponse {
  games: Game[];
}

interface State {
  index: number;
  games: Game[];
}

export default class Games extends Component {
  state: State;
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      index: 0,
      games: [],
    };
  }
  componentDidMount() {
    this.loadGames();
  }
  loadGames = () => {
    axios
      .get(`${config.backendPath}/api/games`)
      .then((r: AxiosResponse<APIResponse>) => {
        this.setState({ games: r.data.games });
      });
  };
  sortGames = (): Game[] => {
    let newGames: Game[] = [];
    this.state.games.sort(
      (a, b) =>
        new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
    );
    for (let i = this.state.index; i < this.state.index + 10; i++) {
      if (this.state.games[i]) newGames.push(this.state.games[i]);
    }
    return newGames;
  };
  sortLoader = () => {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  };
  render() {
    const loaderParams = {
      width: 180,
      height: 240,
    };
    const badgeStyle: { badge: string; icon: string } = {
      badge:
        "bg-gray-300 text-black py-1 px-2 rounded-lg font-bold text-[12.2px]",
      icon: "fa-solid mr-2",
    };
    return (
      <main>
        <div className="container flex flex-col justify-center items-center mt-16 mb-20 last:mb-0">
          {this.state.games.length > 0
            ? this.sortGames().map((e) => (
                <div
                  className="rounded-lg flex flex-row bg-[#0000002c] w-[850px] h-[240px] mb-5"
                  key={e.name}
                >
                  <div className="block w-[180px]">
                    <Link to={`/game/${e._id}`} className="w-[180px]">
                      <Tilt max={12.5} speed={400} scale={1.07} reverse={true}>
                        <img
                          src={e.coverUrl}
                          alt={e.name}
                          width="180px"
                          height="240px"
                          className="relative rounded-lg game-card-img tilt w-[180px] h-[240px]"
                          data-tilt
                        />
                      </Tilt>
                    </Link>
                  </div>
                  <div className="relative flex flex-col justify-between px-10 py-6 whitespace-normal w-[670px]">
                    <Link to={`/game/${e._id}`} className="text-lg">
                      {e.name}
                    </Link>
                    <p className="text-sm text-description">{e.description}</p>
                    <div className="badges flex flex-row justify-evenly">
                      {e.release ? (
                        <Tooltip content="Date de sortie du jeu">
                          <span
                            className={badgeStyle.badge}
                          >
                            <i
                              className={classNames(
                                badgeStyle.icon,
                                "fa-clock"
                              )}
                            ></i>
                            {e.release}
                          </span>
                        </Tooltip>
                      ) : (
                        ""
                      )}
                      {e.lastUpdate ? (
                        <span
                          className={badgeStyle.badge}
                          data-bs-toggle="tooltip"
                          data-bs-title="Dernière mise a jour"
                        >
                          <i
                            className={classNames(
                              badgeStyle.icon,
                              "fa-arrows-rotate mr-2"
                            )}
                          ></i>
                          {e.lastUpdate}
                        </span>
                      ) : (
                        ""
                      )}
                      {e.crackDlSize ? (
                        <span
                          className={badgeStyle.badge}
                          data-bs-toggle="tooltip"
                          data-bs-title="Taille du jeu une fois installé"
                        >
                          <i
                            className={classNames(
                              badgeStyle.icon,
                              "fa-folder mr-2"
                            )}
                          ></i>
                          {e.crackDlSize}
                        </span>
                      ) : (
                        ""
                      )}
                      <span
                        className={badgeStyle.badge}
                        data-bs-toggle="tooltip"
                        data-bs-title={
                          e.isOnline === "true"
                            ? "Le jeu est disponible en multijoueur"
                            : "Le jeu n'est accessible qu'en solo"
                        }
                      >
                        <i
                          className={classNames(
                            badgeStyle.icon,
                            e.isOnline === "true" ? "fa-user-group" : "fa-user"
                          )}
                        ></i>
                        {e.isOnline === "true" ? "Multijoueur" : "Solo"}
                      </span>
                      {/* user ? <a href="/admin/edit/${e._id" className="editGame text-light"><i className="fa-solid fa-gear"></i></a> : "" */}
                    </div>
                  </div>
                </div>
              ))
            : this.sortLoader().map((e) => (
                <div
                  className="rounded-lg flex flex-row bg-[#0000002c] w-[850px] h-[240px] mb-5"
                  key={e}
                >
                  <ContentLoader
                    speed={2}
                    width={loaderParams.width}
                    height={loaderParams.height}
                    viewBox={`0 0 ${loaderParams.width} ${loaderParams.height}`}
                    backgroundColor="#0000003b"
                    foregroundColor="#00000022"
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
              ))}
        </div>
      </main>
    );
  }
}
