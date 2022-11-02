import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import config from "./config";
import axios from "axios";
import Md from "@uiw/react-markdown-preview";

async function fetchGame(gameId) {
  const r = await axios.get(`${config.backendPath}/api/games/${gameId}`);
  return r.data.game;
}

function showTutorial() {
  document.querySelector(".game-tuto").classList.toggle('hidden')
  document.querySelector(".tutorial-icon").classList.toggle('fa-chevron-down')
  document.querySelector(".tutorial-icon").classList.toggle('fa-chevron-up')
}

export default function Game() {
  const { gameId } = useParams();
  const [game, setGame] = useState({ loading: true });

  useEffect(() => {
    (async () => {
      setGame({ loading: true });
      const r = await fetchGame(gameId);
      if (r) {
        document.title = `${r.name} | All-Cracks.fr`
        setGame(r)
      } else setGame(null);
    })();
  }, [gameId]);

  console.log(game.tutorial);
  if (!game)
    return <div className="text-center text-lg my-20">Aucun jeu trouvé</div>;
  if (game.loading)
    return <div className="text-center text-lg my-20">Chargement...</div>;
  return (
    <div className="container">
      <img src={game.bgUrl.replace("screenshot_med", "screenshot_huge")} alt={game.name} className="bg-fixed absolute -z-10 top-0 w-full" />
      <main className="my-20 text-center">
        <div className="text-lg mb-10">{game.name}</div>
        <div className="text-sm mx-40">{game.description}</div>
        {game.tutorial ? (
        <button onClick={showTutorial} className="mx-40 px-8 py-6 rounded-lg bg-[#0d1117]">
          <div className="text-lg">Tutoriel d'installation <i className="fa-solid fa-chevron-down tutorial-icon ml-2"></i></div>
          <Md className="hidden mt-5 text-md game-tuto text-left" source={game.tutorial} />
        </button>
        ) : ""}
      </main>
    </div>
  );
}
