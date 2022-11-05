import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import config from "./config";
import axios from "axios";
import Md from "@uiw/react-markdown-preview";
import { PrimaryButton, SecondaryButton } from "./Util";
import ReactTooltip from "react-tooltip";
import { APIGame } from "./Types";

async function fetchGame(gameId: string): Promise<APIGame> {
  const r = await axios.get(`${config.backendPath}/api/games/${gameId}`);
  return r.data.game;
}

function showTutorial() {
  document.querySelector(".game-tuto")?.classList.toggle("hidden");
  document.querySelector(".tutorial-icon")?.classList.toggle("fa-chevron-down");
  document.querySelector(".tutorial-icon")?.classList.toggle("fa-chevron-up");
}

export default function Game() {
  const { gameId } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [game, setGame] = useState<APIGame | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const r = await fetchGame(gameId ? gameId : "");
      if (r) {
        document.title = `${r.name} | All-Cracks.fr`;
        setGame(r);
        setLoading(false);
      } else {
        document.title = `404 | All-Cracks.fr`;
        setLoading(false);
        setGame(null);
      }
    })();
  }, [gameId]);

  game?.additionalLinks?.forEach((e) => console.log(e));
  if (loading)
    return <div className="text-center text-lg my-20">Chargement...</div>;
  if (game)
    return (
      <div className="container">
        <div className="-z-10 absolute left-0 h-full w-full -mt-[120px] overflow-hidden">
          <div
            className={`w-full h-full bg-cover blur after:absolute after:left-0 after:top-0 after:w-full after:h-full game-bg`}
            style={{
              backgroundImage: `url(${game.bgUrl?.replace(
                "screenshot_med",
                "screenshot_huge"
              )})`,
              backgroundPosition: "center center",
            }}
          ></div>
        </div>
        <main className="my-10 text-center">
          <div className="text-3xl mb-10">{game.name}</div>
          <div className="flex flex-row justify-evenly">
            <img
              src={game.coverUrl?.replace("cover_big", "720p")}
              alt={game.name}
              className="rounded-xl"
              width={264}
              height={374}
            />
            <iframe
              width="664"
              height="374"
              src={`https://www.youtube.com/embed/${game.videoId}?controls=0&rel=0&amp;autoplay=1&mute=1`}
              title={game.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
              className="rounded-xl lg:block md:hidden"
            ></iframe>
          </div>
          {game.tutorial ? (
            <button
              onClick={showTutorial}
              className="mx-40 mt-20 px-8 py-6 rounded-lg bg-[#0d1117]"
            >
              <div className="text-lg">
                Tutoriel d'installation{" "}
                <i className="fa-solid fa-chevron-down tutorial-icon ml-2"></i>
              </div>
              <Md
                className="hidden mt-5 text-md game-tuto text-left"
                source={game.tutorial}
              />
            </button>
          ) : (
            ""
          )}
          <ReactTooltip
            id="globalTip"
            place="top"
            effect="solid"
            backgroundColor="#111827"
          />
          <div className="text-center my-10">
            <div>
              <div
                data-tip={`Ce fichier requiert ${
                  game.crackDlLinkType === "rar" ? "WinRar" : "uTorrent"
                } pour être utilisé`}
                data-for="globalTip"
                className="m-0"
              >
                fichier .{game.crackDlLinkType}{" "}
                <i className="fa-regular fa-circle-question"></i>
              </div>
              <PrimaryButton href={game.crackDlLink} type="href">
                <i className="fa-solid fa-download mr-2 -ml-1"></i>Télécharger
                le jeux
              </PrimaryButton>
            </div>
            <>
              {game.additionalLinks?.map(e => (
                <div key={e.name} className="mt-2">
                  <div
                    data-tip={`Ce fichier requiert ${
                      e.linkType === "rar" ? "WinRar" : "uTorrent"
                    } pour être utilisé`}
                    data-for="globalTip"
                    className="m-0"
                  >
                    fichier .{e.linkType}{" "}
                    <i className="fa-regular fa-circle-question"></i>
                  </div>
                  <SecondaryButton href={e.link} type="href" className="text-sm">
                    <i className="fa-solid fa-download mr-2 -ml-1"></i>
                    <div dangerouslySetInnerHTML={{__html: e.name}}></div>
                  </SecondaryButton>
                </div>
              ))}
            </>
          </div>
          <div>
            <div className="text-2xl">A propos de {game.name} :</div>
            <div className="text-lg mx-20 my-10">{game.description}</div>
            <div className="text-left mx-20">
              Derniere mise a jour : {game.lastUpdate}<br/>
              Date de sortie du jeux : {game.release}<br/>
              Taille du jeux une fois installé : {game.crackDlSize}
            </div>
          </div>
        </main>
      </div>
    );
  else return <div className="text-center text-lg my-20">Aucun jeu trouvé</div>;
}
