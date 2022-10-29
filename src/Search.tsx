import React, { FormEvent, useState } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
} from "react-instantsearch-hooks-web";
import { Link, useSearchParams, redirect } from "react-router-dom";
import config from "./config";
import { Oval } from "react-loader-spinner";

const searchClient = algoliasearch(config.searchId, config.searchKey);

interface SubmitElement extends FormEvent<HTMLFormElement> {
  target: eventTarget;
}

interface inputEvent extends FormEvent<HTMLInputElement> {
  target: HTMLInputElement;
}

interface eventTarget extends EventTarget {
  value?: string;
}

interface Hit {
  hit: {
    name: string;
    coverUrl: string;
    _id: string;
  };
}

export default function Search() {
  const [state, setState] = useState<boolean>(false);
  const [params, setParams] = useSearchParams();
  function submitSearch(event: SubmitElement) {
    const value = event.target?.value

    if(value) {
      if(value.length <= 0) return closeSearch();
    }
    redirect("")
  }
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
        onSubmit={submitSearch}
        defaultValue={params.get("search") || ""}
        submitIconComponent={() => (
          <i className="fa-solid fa-magnifying-glass submit-icon text-gray-500"></i>
        )}
        resetIconComponent={() => (
          <button onClick={closeSearch} className="z-10 cursor-pointer">
            <i className="fa-solid fa-xmark search-reset text-gray-500"></i>
          </button>
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
        <div className="absolute flex flex-col left-0 top-12">
          <Hits
            hitComponent={({ hit }: Hit) => {
              return (
                <Link to={`/game/${hit._id}`} className="mt-10 cursor-pointer flex flex-row" onClick={closeSearch}>
                  <img src={hit.coverUrl.replace("cover_big", "cover_small")} alt={hit.name} />
                  <h1>{hit.name}</h1>
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
