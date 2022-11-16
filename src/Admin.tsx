import React, { FormEvent, Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { APIGame, APIResponse, APIUser } from "./Types";
import axios, { AxiosResponse } from "axios";
import config from "./config";
import { NoConnection } from "./Util";
import { useUser } from "./User.context";

axios.defaults.withCredentials = true;

interface State {
  loading: boolean;
  logged: boolean;
  error?: string;
}

interface AdminAPIResponse {
  success: boolean;
  message?: string;
  user?: APIUser;
}

export default function Init() {
  const [state, setState] = useState<State>({ loading: true, logged: false });
  const {setUser} = useUser();
  const [data, setData] = useState<{ email: string; password: string } | null>(
    null
  );
  function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (data) {
      axios
        .post(`${config.backendPath}/api/admin/login`, data, {withCredentials: false})
        .then((r: AxiosResponse<AdminAPIResponse>) => {
          if (r.data.success) {
            setState({ logged: true, loading: false });
            setUser(r.data.user ? r.data.user : null)
          } else {
            setState({ logged: false, error: r.data.message, loading: false });
          }
        });
    }
  }
  function checkConnected() {
    axios
      .get(`${config.backendPath}/api/admin/info`, {withCredentials: true})
      .then((r: AxiosResponse<AdminAPIResponse>) => {
        if(r.data.success) {
          setState({ loading: false, logged: true })
          setUser(r.data.user ? r.data.user : null)
        } else {
          setState({ loading: false, logged: false, error: r.data.message });
        }
      });
  }
  useEffect(() => {
    document.title = `Admin Panel${config.titleSufix}`;
    checkConnected();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {state.logged ? (
        <Admin />
      ) : state.loading ? (
        <div>Chargement...</div>
      ) : (
        <form onSubmit={login}>
          {state.error ? <div className="text-red-500">{state.error}</div> : ""}
          <input
            type="email"
            name="email"
            onInput={(e) =>
              // @ts-ignore
              setData({ email: e.target.value, password: data?.password || "" })
            }
          />
          <input
            type="password"
            name="password"
            onInput={(e) =>
              // @ts-ignore
              setData({ password: e.target.value, email: data?.email || "" })
            }
          />
          <input type="submit" value="Log in" />
        </form>
      )}
    </>
  );
}

function Admin(): JSX.Element {
  const {user} = useUser()
  const [state, setState] = useState({ loading: true, success: false });
  const [games, setGames] = useState<APIGame[] | null>(null);

  useEffect(() => {
    loadGames();
  }, []);

  function loadGames() {
    axios
      .get(`${config.backendPath}/api/admin/gameselector`)
      .then((r: AxiosResponse<APIResponse>) => {
        setState({ loading: false, success: true });
        setGames(
          r.data.games.sort(
            (a, b) =>
              new Date(b.lastUpdateDate).getTime() -
              new Date(a.lastUpdateDate).getTime()
          )
        );
      })
      .catch(() => {
        setState({ loading: false, success: false });
      });
  }

  return (
    <div className="text-center items-center justify-center flex flex-col my-20 mx-10">
      <div>Logged in as {user?.email}</div>
      {state.success && games ? (
        <div className="w-80">
          <DropDown options={games} />
        </div>
      ) : state.loading ? (
        <>Loading games...</>
      ) : (
        <NoConnection retry={loadGames} />
      )}
    </div>
  );
}

function DropDown({ options }: { options: APIGame[] }) {
  const [selected, setSelected] = useState<APIGame>(options[0]);
  const [query, setQuery] = useState("");
  let filteredPeople = options;

  query === ""
    ? (filteredPeople = options)
    : (filteredPeople = options.filter((e) =>
        e.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.toLowerCase().replace(/\s+/g, ""))
      ));

  return (
    <div className="block top-16 w-72">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(person: APIGame) => person.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((person) => (
                  <Combobox.Option
                    key={person._id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-sky-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-sky-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
