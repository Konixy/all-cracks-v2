import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import config from './config';
import { PrimaryButton, SecondaryButton } from './Util';
import Tilt from 'react-tilted';
import { APIGame, APIResponse } from './Types';
// eslint-disable-next-line import/named
import axios, { AxiosResponse } from 'axios';
import ContentLoader from 'react-content-loader';
// import Vibrant from 'node-vibrant';

export default function Home() {
  const [state, setState] = useState({ loading: true, success: false });
  const [games, setGames] = useState<APIGame[] | null>(null);

  // async function getVibrantColor(imageUrl: string | undefined) {
  //   const url = 'https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium.png';
  //   return (await new Vibrant(url, {}).getPalette()).Vibrant?.hex;
  // }

  // getVibrantColor('https://images.igdb.com/igdb/image/upload/t_original/co52vm.jpg').then((e) => console.log(e));

  function loadGames() {
    setState({ loading: true, success: false });
    axios
      .get(`${config.backendPath}/api/home/games`)
      .then((r: AxiosResponse<APIResponse>) => {
        setState({ loading: false, success: true });
        setGames(r.data.games.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()));
      })
      .catch((err) => {
        console.log(err);
        setState({ loading: false, success: false });
      });
  }

  useEffect(() => {
    document.title = 'All-Cracks.fr';
    loadGames();
  }, []);

  const loaderParams = {
    width: 180,
    height: 240,
  };
  return (
    <div className="my-40 items-center text-center">
      <div className="m-0 w-full">
        <h1 className="mx-4 text-center text-2xl lg:mx-20">
          Touts vos jeux préférés, gratuits et téléchargable en un seul <span className="text-blue-500 underline">click</span>
          <i className="fa-solid fa-arrow-pointer text-shadow-white absolute translate-y-5 -translate-x-3 text-black"></i> !
        </h1>
        <div className="relative mt-10 flex flex-col items-center justify-center text-center sm:flex-row">
          <PrimaryButton href="/games" type="link" className="mb-4 sm:mr-4 sm:mb-0">
            Voir tout les jeux
          </PrimaryButton>
          <SecondaryButton href={config.discordInvite} type="href">
            <i className="fa-solid fa-arrow-up-right-from-square mr-2"></i>
            Notre discord
          </SecondaryButton>
        </div>
      </div>
      <div className="mt-80 w-full bg-gradient-to-tr from-green-200 to-blue-200  py-20">
        <h1 className="text-2xl font-semibold text-slate-800">Nos dernières sorties :</h1>
        <div className="mt-10 flex flex-col items-center justify-evenly md:flex-row lg:mx-10">
          {state.success && games ? (
            games.map((e) => (
              <div key={e._id} className="flex flex-row bg-slate-500/50">
                <div className="block w-[180px]">
                  <Link to={`/game/${e._id}`} className="w-[180px]">
                    <Tilt max={12.5} speed={400} scale={1.07} reverse={true}>
                      <img
                        src={e.coverUrl}
                        alt={e.name}
                        width="180px"
                        height="240px"
                        className="game-card-img tilt relative h-[240px] w-[180px] rounded-lg"
                        data-tilt
                      />
                    </Tilt>
                  </Link>
                </div>
                <div className="relative flex flex-col whitespace-normal px-10 py-6 md:justify-between">
                  <Link to={`/game/${e._id}`} className="text-lg">
                    {e.name}
                  </Link>
                  <p className="text-description text-sm">{e.description}</p>
                  <Link to={`/game/${e._id}`} className="rounded-lg bg-slate-200 px-2 py-1 text-black">
                    Découvrir <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))
          ) : state.loading ? (
            [1, 2].map((e) => (
              <div className="flex h-[240px] flex-row rounded-lg bg-slate-600/50" key={e}>
                <ContentLoader
                  speed={2}
                  width={loaderParams.width}
                  height={loaderParams.height}
                  viewBox={`0 0 ${loaderParams.width} ${loaderParams.height}`}
                  backgroundColor="#00000022"
                  foregroundColor="#0000003b"
                  className="relative rounded-lg outline-none"
                >
                  <rect x="0" y="0" width={loaderParams.width} height={loaderParams.height} />
                </ContentLoader>
                <div className="whitespace-normal px-10 py-6">
                  <ContentLoader speed={2} width={400} height={240} viewBox="0 0 400 240" backgroundColor="#37415122" foregroundColor="#37415144">
                    <rect x={0} y={0} rx={6} ry={6} width={250} height={25} />
                  </ContentLoader>
                </div>
              </div>
            ))
          ) : (
            <div className="my-24 flex flex-col text-black">
              <i className="fa-solid fa-warning mb-2 text-2xl text-orange-400"></i>
              Connexion impossible
              <button className="mt-2 rounded-md bg-white px-2 py-1 transition-all hover:bg-slate-100" onClick={loadGames}>
                Ressayer
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-40 w-full">
        <h1 className="text-2xl">
          <i className="fa-solid fa-shield-keyhole"></i> Votre sécurité, notre priorité
        </h1>
        <div className="mt-10 text-lg text-slate-300">
          Tout nos jeux sont téstés et approuvés par notre équipe.
          <br />
          <span className="mt-2 text-3xl text-white">0%</span> de chance d&apos;avoir un virus
        </div>
      </div>
    </div>
  );
}
