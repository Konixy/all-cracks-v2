import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import config from './config';
import ContentLoader from 'react-content-loader';
import Tilt from 'react-tilted';
import axios, { AxiosResponse } from 'axios';
import { classNames, NoConnection } from './Util';
import ReactTooltip from 'react-tooltip';
import { APIGame, APIResponse } from './Types';

function Games({ currentGames, state, retry }: { currentGames: APIGame[] | null; state: { success: boolean; loading: boolean }; retry: () => void }) {
  useEffect(() => {
    document.title = `Jeux${config.titleSufix}`;
  }, []);
  const loaderParams = {
    width: 180,
    height: 240,
  };
  const badgeStyle = {
    badge: 'bg-gray-300 text-black py-1 px-2 rounded-lg font-bold text-[12.2px] mt-2 sm:mt-0',
    icon: 'fa-solid mr-2',
  };
  return (
    <>
      {state.success && currentGames ? (
        currentGames.map((e) => (
          <div className="mb-5 flex w-full flex-col items-center rounded-lg bg-[#0000002c] md:h-[240px] md:w-[850px] md:flex-row" key={e.name}>
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
            <div className="relative flex flex-col whitespace-normal px-10 py-6 md:h-full md:w-[670px] md:justify-between">
              <Link to={`/game/${e._id}`} className="text-lg">
                {e.name}
              </Link>
              <p className="text-description text-sm">{e.description}</p>
              <div className="badges flex flex-col items-center justify-evenly sm:flex-row md:justify-between">
                <ReactTooltip id="globalTip" place="top" effect="solid" backgroundColor="#111827" />
                <span className={badgeStyle.badge} data-tip="Jeu tésté par notre équipe et certifié sans virus." data-for="globalTip">
                  <i className={classNames(badgeStyle.icon, 'fa-lock')}></i>
                  Sécurisé
                </span>
                {e.release ? (
                  <>
                    <span className={badgeStyle.badge} data-tip="Date de sortie du jeu" data-for="globalTip">
                      <i className={classNames(badgeStyle.icon, 'fa-clock')}></i>
                      {e.release}
                    </span>
                  </>
                ) : (
                  ''
                )}
                {e.lastUpdate ? (
                  <span className={badgeStyle.badge} data-for="globalTip" data-tip="Dernière mise a jour">
                    <i className={classNames(badgeStyle.icon, 'fa-arrows-rotate mr-2')}></i>
                    {e.lastUpdate}
                  </span>
                ) : (
                  ''
                )}
                {e.crackDlSize ? (
                  <span className={badgeStyle.badge} data-for="globalTip" data-tip="Taille du jeu une fois installé">
                    <i className={classNames(badgeStyle.icon, 'fa-folder mr-2')}></i>
                    {e.crackDlSize}
                  </span>
                ) : (
                  ''
                )}
                <span
                  className={badgeStyle.badge}
                  data-for="globalTip"
                  data-tip={e.isOnline === 'true' ? 'Le jeu est disponible en multijoueur' : "Le jeu n'est accessible qu'en solo"}
                >
                  <i className={classNames(badgeStyle.icon, e.isOnline === 'true' ? 'fa-user-group' : 'fa-user')}></i>
                  {e.isOnline === 'true' ? 'Multijoueur' : 'Solo'}
                </span>
                {/* user ? <a href="/admin/edit/${e._id" className="editGame text-light"><i className="fa-solid fa-gear"></i></a> : "" */}
              </div>
            </div>
          </div>
        ))
      ) : state.loading ? (
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((e) => (
          <div className="mb-5 flex h-[240px] w-[850px] flex-row rounded-lg bg-[#0000002c]" key={e}>
            <ContentLoader
              speed={2}
              width={loaderParams.width}
              height={loaderParams.height}
              viewBox={`0 0 ${loaderParams.width} ${loaderParams.height}`}
              backgroundColor="#0000003b"
              foregroundColor="#00000022"
              className="relative rounded-lg outline-none"
            >
              <rect x="0" y="0" width={loaderParams.width} height={loaderParams.height} />
            </ContentLoader>
            <div className="w-[670px] whitespace-normal px-10 py-6">
              <ContentLoader speed={2} width={600} height={240} viewBox="0 0 600 240" backgroundColor="#37415122" foregroundColor="#37415144">
                <rect x={0} y={0} rx={6} ry={6} width={300} height={25} />
                <rect x={0} y={70} rx={6} ry={6} width={600} height={15} />
                <rect x={0} y={100} rx={6} ry={6} width={420} height={15} />
                <rect x={0} y={130} rx={6} ry={6} width={520} height={15} />
              </ContentLoader>
            </div>
          </div>
        ))
      ) : (
        <NoConnection retry={retry} />
      )}
    </>
  );
}

export default function GamesList() {
  const [state, setState] = useState({ loading: true, success: false });
  const [games, setGames] = useState<APIGame[] | null>(null);
  const [currentItems, setCurrentItems] = useState<APIGame[] | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState<number>(0);
  const itemsPerPage = 10;

  useEffect(() => {
    setState({ loading: true, success: false });
    loadGames();
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(games ? games.slice(itemOffset, endOffset) : null);
    setPageCount(Math.ceil((games ? games.length : 10) / itemsPerPage));
  }, [games, itemOffset, itemsPerPage]);

  function loadGames() {
    setState({ loading: true, success: false });
    axios
      .get(`${config.backendPath}/api/games`)
      .then((r: AxiosResponse<APIResponse>) => {
        setState({ loading: false, success: true });
        setGames(r.data.games.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()));
      })
      .catch((err) => {
        console.log('an error occured');
        setState({ loading: false, success: false });
      });
  }

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % (games ? games.length : 10);
    setItemOffset(newOffset);
  };

  return (
    <main className="mt-16 mb-10 items-center">
      <div className="mb-5 flex flex-col items-center justify-center last:mb-0">
        <Games currentGames={currentItems} state={state} retry={loadGames} />
      </div>
      <ReactPaginate
        breakLabel={<span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">...</span>}
        disabledClassName="bg-gray-700 hover:text-gray-400 cursor-default"
        previousClassName="block h-[37.5px] leading-tight rounded-l-lg border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white disabled:hover:text-gray-300 disabled:text-gray-300 disabled:bg-gray-700 disabled:hover:bg-gray-700 cursor-pointer"
        previousLabel={
          <div className="ml-0 translate-y-1/2 px-3">
            <span className="sr-only">Page précédente</span>
            <i className="fa-solid fa-chevron-left"></i>
          </div>
        }
        nextClassName="block h-[37.5px] leading-tight rounded-r-lg border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white disabled:hover:text-gray-300 disabled:text-gray-300 disabled:bg-gray-700 disabled:hover:bg-gray-700 cursor-pointer"
        nextLabel={
          <div className="ml-0 translate-y-1/2 px-3">
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
        className="isolate flex flex-row items-center justify-center -space-x-px rounded-md shadow-sm"
      />
    </main>
  );
}
