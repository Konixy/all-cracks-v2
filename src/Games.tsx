import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import config from "./config";
import ContentLoader from "react-content-loader";
import Tilt from "react-tilted";
import axios, { AxiosResponse } from "axios";
import { classNames } from "./Util";
import ReactTooltip from "react-tooltip";

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

function Games({ currentGames }: { currentGames: Game[] | null }) {
  useEffect(() => {
    document.title = "Jeux | All-Cracks.fr";
  }, []);
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
    <>
      {currentGames
        ? currentGames.map((e) => (
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
                  <ReactTooltip
                    id="globalTip"
                    place="top"
                    effect="solid"
                    backgroundColor="#111827"
                  />
                  {e.release ? (
                    <>
                      <span
                        className={badgeStyle.badge}
                        data-tip="Date de sortie du jeu"
                        data-for="globalTip"
                      >
                        <i
                          className={classNames(badgeStyle.icon, "fa-clock")}
                        ></i>
                        {e.release}
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                  {e.lastUpdate ? (
                    <span
                      className={badgeStyle.badge}
                      data-for="globalTip"
                      data-tip="Dernière mise a jour"
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
                      data-for="globalTip"
                      data-tip="Taille du jeu une fois installé"
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
                    data-for="globalTip"
                    data-tip={
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
        : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((e) => (
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
              <div className="relative flex flex-col justify-between px-10 py-6 whitespace-normal w-[670px]">
                <ContentLoader
                  speed={2}
                  width={300}
                  height={25}
                  viewBox="0 0 300 25"
                  backgroundColor="#37415122"
                  foregroundColor="#37415144"
                  className="rounded-md"
                >
                  <rect
                    x="0"
                    y="0"
                    width={300}
                    height={25}
                  />
                </ContentLoader>
              </div>
            </div>
          ))}
    </>
  );
}

export default function GamesList() {
  // We start with an empty list of items.
  const [games, setGames] = useState<Game[] | null>(null);
  const [currentItems, setCurrentItems] = useState<Game[] | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState<number>(0);
  const itemsPerPage = 10;

  useEffect(() => {
    loadGames();
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(games ? games.slice(itemOffset, endOffset) : null);
    setPageCount(Math.ceil((games ? games.length : 10) / itemsPerPage));
  }, [games, itemOffset, itemsPerPage]);

  function loadGames() {
    axios
      .get(`${config.backendPath}/api/games`)
      .then((r: AxiosResponse<APIResponse>) => {
        setGames(r.data.games.sort((a,b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()));
      });
  }

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const newOffset =
      (event.selected * itemsPerPage) % (games ? games.length : 10);
    setItemOffset(newOffset);
  };

  return (
    <main className="items-center mt-16 mb-10">
      <div className="container flex flex-col justify-center items-center mb-5 last:mb-0">
        <Games currentGames={currentItems} />
      </div>
      <ReactPaginate
        breakLabel={
          <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
            ...
          </span>
        }
        disabledClassName="bg-gray-700 hover:text-gray-400 cursor-default"
        previousClassName="block h-[37.5px] leading-tight rounded-l-lg border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white disabled:hover:text-gray-300 disabled:text-gray-300 disabled:bg-gray-700 disabled:hover:bg-gray-700 cursor-pointer"
        previousLabel={
          <div className="px-3 ml-0 translate-y-1/2">
            <span className="sr-only">Page précédente</span>
            <i className="fa-solid fa-chevron-left"></i>
          </div>
        }
        nextClassName="block h-[37.5px] leading-tight rounded-r-lg border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white disabled:hover:text-gray-300 disabled:text-gray-300 disabled:bg-gray-700 disabled:hover:bg-gray-700 cursor-pointer"
        nextLabel={
          <div className="px-3 ml-0 translate-y-1/2">
            <span className="sr-only">Page suivante</span>
            <i className="fa-solid fa-chevron-right"></i>
          </div>
        }
        pageClassName="m-0 p-0"
        pageLinkClassName="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        activeLinkClassName="z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        renderOnZeroPageCount={undefined}
        className="flex flex-row justify-center items-center isolate -space-x-px rounded-md shadow-sm"
      />
    </main>
  );
}
