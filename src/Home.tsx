import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "./config";
import { PrimaryButton, SecondaryButton } from "./Util";
import Tilt from "react-tilted";
import { APIGame, APIResponse } from "./Types";
import axios, { AxiosResponse } from "axios";

export default function Home() {
  const [games, setGames] = useState<APIGame[] | null>(null);

  function loadGames() {
    axios
      .get(`${config.backendPath}/api/home/games`)
      .then((r: AxiosResponse<APIResponse>) => {
        setGames(
          r.data.games.sort(
            (a, b) =>
              new Date(b.releaseDate).getTime() -
              new Date(a.releaseDate).getTime()
          )
        );
      });
  }

  useEffect(() => {
    document.title = "All-Cracks.fr";
    loadGames();
  }, []);
  return (
    <div className="container items-center text-center my-40 w-full">
      <div className="w-full m-0">
        <h1 className="text-2xl text-center lg:mx-20">
          Touts vos jeux préférés, gratuits et téléchargable en un seul{" "}
          <span className="text-blue-500 underline">click</span>
          <i className="fa-solid fa-arrow-pointer absolute translate-y-5 -translate-x-3 text-black text-shadow-white"></i>{" "}
          !
        </h1>
        <div className="relative mt-10 flex flex-col sm:flex-row justify-center items-center text-center">
          <PrimaryButton
            href="/games"
            type="link"
            className="sm:mr-4 sm:mb-0 mb-4"
          >
            Voir tout les jeux
          </PrimaryButton>
          <SecondaryButton href={config.discordInvite} type="href">
            <i className="fa-solid fa-arrow-up-right-from-square mr-2"></i>
            Notre discord
          </SecondaryButton>
        </div>
      </div>
      <div className="w-full mt-40 py-20 bg-gradient-to-tr from-green-200  to-blue-200">
        <h1 className="text-2xl text-slate-800">Nos dernières sorties :</h1>
        <div className="flex flex-col md:flex-row items-center justify-evenly lg:mx-10">
          {games
            ? games.map((e) => (
                <div className="bg-slate-500">
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
                  <div className="relative flex flex-col md:justify-between px-10 py-6 whitespace-normal md:w-[670px] md:h-full">
                    <Link to={`/game/${e._id}`} className="text-lg">
                      {e.name}
                    </Link>
                    <p className="text-sm text-description">{e.description}</p>
                    <div className="bg-slate-200 px-2 py-1 text-black rounded-lg">Découvrir <i className="fa-solid fa-arrow-right"></i></div>
                  </div>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
      <div className="w-full mt-40">
        <h1 className="text-2xl">
          <i className="fa-solid fa-shield-keyhole"></i> La sécurité, notre
          priorité
        </h1>
        <div className="text-lg text-slate-300 mt-10">
          Tout nos jeux sont téstés et approuvés par notre équipe.
          <br />
          <span className="text-white text-3xl mt-2">0%</span> de chance d'avoir un virus
        </div>
      </div>
    </div>
  );
}
