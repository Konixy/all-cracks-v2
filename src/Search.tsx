import React, { FormEvent, useState, useEffect } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
  Highlight
} from "react-instantsearch-hooks-web";
import { Link, useSearchParams } from "react-router-dom";
import config from "./config";
import { Oval } from "react-loader-spinner";

const searchClient = algoliasearch(config.searchId, config.searchKey);

interface inputEvent extends FormEvent<HTMLInputElement> {
  target: HTMLInputElement;
}

interface Hit {
  hit: {
    name: string;
    coverUrl: string;
    _id: string;
    __position: number;
    __queryID?: string;
    objectID: string;
  };
}

export default function Search() {
  const [state, setState] = useState<boolean>(false);
  const [params, setParams] = useSearchParams();
  useEffect(() => {
    const searchInput: HTMLInputElement | null = document.querySelector(".search-input");
    searchInput?.addEventListener('focusout', (event: FocusEvent) => {
      const target: (HTMLInputElement & EventTarget) | null = event.target as (HTMLInputElement & EventTarget);
      if(target?.value.length <= 0) return closeSearch();
      closeSearch()
    })
    searchInput?.addEventListener('focusin', (event: FocusEvent) => {
      const target: (HTMLInputElement & EventTarget) | null = event.target as (HTMLInputElement & EventTarget);
      if(target?.value.length <= 0) return closeSearch();
      else openSearch(target?.value);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  // function submitSearch(event: SubmitElement) {
  //   const value = event.target?.value

  //   if(value) {
  //     if(value.length <= 0) return closeSearch();
  //   }
  //   redirect(`/games/${hits.hits[0]._id}`)
  // }
  function searchInput(event: inputEvent) {
    const value = event.target?.value;

    if (value.length <= 0) return closeSearch();
    else openSearch(value);
  }
  function openSearch(value: string) {
    setState(true);
    setParams(`search=${value}`);
  }
  function closeSearch() {
    setState(false);
    setParams("");
  }
  return (
    <InstantSearch searchClient={searchClient} indexName="Games">
      <Configure hitsPerPage={5} />
      <SearchBox
        className="search-input"
        inputMode="search"
        onInput={searchInput}
        // onSubmit={submitSearch}
        defaultValue={params.get("search") || ""}
        submitIconComponent={() => (
          <i className="z-20 fa-solid fa-magnifying-glass submit-icon text-gray-500"></i>
        )}
        resetIconComponent={() => (
          <i className="z-20 fa-solid fa-xmark search-reset text-gray-500"></i>
        )}
        loadingIconComponent={() => (
          <Oval
            color="black"
            secondaryColor="black"
            wrapperClass="search-loader"
            width="1rem"
            height="1rem"
          />
        )}
      />
      {state ? (
        <div className="absolute flex flex-col left-0 top-12 bg-slate-700/75 p-4 rounded-md">
          <Hits
            hitComponent={({ hit }: Hit) => {
              return (
                <Link to={`/game/${hit._id}`} className="z-50 mt-10 cursor-pointer flex flex-row hover:bg-slate-600/75" onClick={closeSearch}>
                  <img src={hit.coverUrl} alt={hit.name} width="90" height="128" />
                  <div>
                  <Highlight className="ml-2 text-ellipsis" attribute="name" hit={hit}></Highlight>
                    <div className="bg-white text-black">Accéder au jeu</div>
                  </div>
                </Link>
              );
            }}
          />
        </div>
      ) : (
        ""
      )}
    </InstantSearch>
    // <div>
    //   <div className="relative mt-3">
    //     <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none text-gray-500">
    //       <i className="fa-solid fa-magnifying-glass"></i>
    //     </div>
    //     <input
    //       type="text"
    //       id="search-navbar"
    //       className="block p-2 pl-8 w-full rounded-lg border sm:text-sm bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:ring-1 focus:border-blue-500 outline-none transition-all"
    //       placeholder="Search..."
    //       onInput={searchInput}
    //       value={`${params.get("search") ? params.get("search") : ""}`}
    //     />
    //   </div>
    //   {params.get("search") ? (
    //     <InstantSearch searchClient={searchClient} indexName="instant_search">
    //       <div className="absolute">{params.get("search")}</div>
    //     </InstantSearch>
    //   ) : (
    //     ""
    //   )}
    // </div>
  );
}
