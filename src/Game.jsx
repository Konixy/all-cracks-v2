import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import config from "./config";
import axios from "axios";
// import Md from 'react-markdown'

export function OnGameLoad() {
  setTimeout(() => {
    return <>Loading</>;
  }, 5000);
}

async function fetchGame(gameId) {
  const r = await axios.get(`${config.backendPath}/api/games/${gameId}`);
  return r.data.game;
}

export default function Game() {
  const { gameId } = useParams();
  const [game, setGame] = useState({ loading: true });

  useEffect(() => {
    (async () => {
      setGame({ loading: true });
      const r = await fetchGame(gameId);
      if (r) setGame(r);
      else setGame(null);
    })();
  }, [gameId]);

  console.log(game);
  if (!game)
    return <div className="text-center text-lg my-20">Aucun jeu trouvé</div>;
  if (game.loading)
    return <div className="text-center text-lg my-20">Chargement...</div>;
  return (
    <div className="container">
      <img src={game.bgUrl.replace("screenshot_med", "original")} alt={game.name} className="bg-fixed absolute -z-10 top-0 w-full" />
      <main className="text-center my-20">
        <div className="text-lg mb-10">{game.name}</div>
        <div className="text-sm mx-40">{game.description}</div>
        <div
          className="text-md mx-40 mt-10"
          dangerouslySetInnerHTML={{
            __html: game.tutorial.replace(/\n/gm, "<br/>"),
          }}
        ></div>
      </main>
    </div>
  );
}
