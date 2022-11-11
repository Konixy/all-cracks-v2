import { Fragment, Component, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import config from "./config";
import axios from "axios";
import ContentLoader from "react-content-loader";
import Search from "./Search";
import { classNames } from "./Util";
import { APIGame } from "./Types";

export default class Header extends Component {
  state: {
    nav: {
      name: string;
      type: string;
      href: string;
      dropdownItems?: {
        type: string;
        name?: string;
        href?: string;
        text?: string;
      }[];
    }[];
  };
  props!: { path: string; };
  constructor(props: {path: string}) {
    super(props);
    this.state = {
      nav: [
        { name: "Acceuil", type: "link", href: "/" },
        {
          name: "Jeux",
          type: "dropdown",
          href: "/games",
          dropdownItems: [
            { type: "link", name: "Tout les jeux", href: "/games" },
            { type: "hr" },
            { type: "text", text: "Dernières sorties" },
            { type: "loader" },
          ],
        },
        {
          name: "Discord",
          type: "href",
          href: config.discordInvite,
        },
        { name: "DMCA", type: "link", href: "/dmca" },
      ],
    };
  }
  fetchGames = async () => {
    axios
      .get(`${config.backendPath}/api/header/games`)
      .then((response) => {
        let dropdownItems:
          | {
              type: string;
              name?: string;
              href?: string;
              text?: string;
            }[]
          | undefined;
        const item = this.state.nav.find((e) => e.name === "Jeux");
        if (item) {
          dropdownItems = item.dropdownItems;
        }
        if (dropdownItems) {
          dropdownItems.pop();
          response.data.games.forEach((e: APIGame) => {
            dropdownItems?.push({
              type: "link",
              name: e.name,
              href: "/game/" + e._id,
            });
          });
        }
        this.setState(this.state);
      })
      .catch((e) => {
        console.log("failed to fetch");
        let dropdownItems:
          | {
              type: string;
              name?: string;
              href?: string;
              text?: string;
            }[]
          | undefined;
        const item = this.state.nav.find((e) => e.name === "Jeux");
        if (item) {
          dropdownItems = item.dropdownItems;
        }
        if (dropdownItems) {
          dropdownItems.pop();
          dropdownItems.push({ type: "error" });
        }
        this.setState(this.state);
      });
  };
  componentDidMount() {
    this.fetchGames();
  }
  render() {
    return (
      <>
        <div className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
          <div className="w-[108rem] flex-none flex justify-end">
            <picture>
              <source
                srcSet="https://tailwindcss.com/_next/static/media/docs-dark@30.1a9f8cbf.avif"
                type="image/avif"
              />
              <img
                src="https://tailwindcss.com/_next/static/media/docs-dark@tinypng.1bbe175e.png"
                alt=""
                className="w-[90rem] flex-none max-w-none block"
                decoding="async"
              />
            </picture>
          </div>
        </div>
        <Disclosure as="nav">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button*/}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex flex-shrink-0 items-center justify-center text-white text-goodtime text-2xl">
                      <Link
                        to="/"
                        className="block h-8 w-auto lg:hidden select-none"
                      >
                        All-Cracks.fr
                      </Link>
                      <Link
                        to="/"
                        className="hidden h-8 w-auto lg:block select-none"
                      >
                        All-Cracks.fr
                      </Link>
                    </div>
                    <div className="hidden sm:ml-6 sm:block sm:justify-between sm:items-center sm:w-full">
                      <div className="flex space-x-4">
                        {this.state.nav.map((item) =>
                          item.type === "href" ? (
                            <a
                              key={item.name}
                              href={item.href}
                              rel="noreferrer"
                              target="_blank"
                              className={[
                                this.props.path === item.href
                                  ? "text-white"
                                  : "text-slate-400 hover:text-white",
                                "px-3 py-2 rounded-md text-base font-medium transition-all",
                              ].join(" ")}
                              aria-current={
                                this.props.path === item.href
                                  ? "page"
                                  : undefined
                              }
                            >
                              {item.name}
                            </a>
                          ) : item.type === "link" ? (
                            <Link
                              key={item.name}
                              to={item.href}
                              className={[
                                this.props.path === item.href
                                  ? "text-white"
                                  : "text-slate-400 hover:text-white",
                                "px-3 py-2 rounded-md text-base font-medium transition-all",
                              ].join(" ")}
                              aria-current={
                                this.props.path === item.href
                                  ? "page"
                                  : undefined
                              }
                            >
                              {item.name}
                            </Link>
                          ) : (
                            <Menu as="div" className="relative">
                              <div>
                                <Menu.Button
                                  className={[
                                    this.props.path === item.href
                                      ? "text-white"
                                      : "text-slate-400 hover:text-white focus:text-white",
                                    "px-3 py-2 rounded-md text-base font-medium transition-all flex items-center justify-center outline-none",
                                  ].join(" ")}
                                >
                                  <span className="sr-only">
                                    Ouvrir la liste des jeux
                                  </span>
                                  {item.name}
                                  <i className="fa-solid fa-caret-down ml-2 -translate-y-[1px]"></i>
                                </Menu.Button>
                              </div>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items className="absolute -right-[50%] translate-x-[10px] z-10 mt-2 w-48 origin-center rounded-md bg-slate-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  {item.dropdownItems?.map((e) => (
                                    <Menu.Item key={e.name}>
                                      {({ active }) =>
                                        e.type === "link" ? (
                                          <Link
                                            key={e.name}
                                            to={e.href || "/"}
                                            className={classNames(
                                              active ? "bg-slate-700" : "",
                                              "block px-3 mx-2 rounded-md py-2 my-1 text-sm text-white text-ellipsis overflow-hidden whitespace-nowrap select-none"
                                            )}
                                          >
                                            {e.name}
                                          </Link>
                                        ) : e.type === "hr" ? (
                                          <div
                                            key={e.type}
                                            className="relative mx-3 mt-2 rounded-sm border-b-slate-600 border-b-[1px]"
                                          ></div>
                                        ) : e.type === "text" ? (
                                          <div
                                            key={e.type}
                                            className="relative mb-1 mt-2 text-center text-slate-400 text-xs font-semibold"
                                          >
                                            {e.text}
                                          </div>
                                        ) : e.type === "loader" ? (
                                          <ContentLoader
                                            speed={2}
                                            width={192}
                                            height={200}
                                            viewBox="0 0 192 200"
                                            backgroundColor="#4b5563"
                                            foregroundColor="#6b7280"
                                            className="px-3 relative outline-none"
                                            key={e.name}
                                          >
                                            <rect
                                              x="0"
                                              y="0"
                                              rx="8"
                                              ry="8"
                                              width="190"
                                              height="30"
                                              className="mt-2"
                                            />
                                            <rect
                                              x="0"
                                              y="40"
                                              rx="8"
                                              ry="8"
                                              width="190"
                                              height="30"
                                              className="mt-2"
                                            />
                                            <rect
                                              x="0"
                                              y="80"
                                              rx="8"
                                              ry="8"
                                              width="190"
                                              height="30"
                                              className="mt-2"
                                            />
                                            <rect
                                              x="0"
                                              y="120"
                                              rx="8"
                                              ry="8"
                                              width="190"
                                              height="30"
                                              className="mt-2"
                                            />
                                            <rect
                                              x="0"
                                              y="160"
                                              rx="8"
                                              ry="8"
                                              width="190"
                                              height="30"
                                              className="mt-2"
                                            />
                                          </ContentLoader>
                                        ) : (
                                          <div
                                            key={e.type}
                                            className="px-3 my-2 text-center flex flex-col"
                                          >
                                            <div>
                                              <i className="fa-solid fa-warning text-lg text-orange-400"></i>{" "}
                                              Erreur
                                            </div>
                                            <button
                                              className="bg-slate-300 text-black py-1 px-2 rounded-md mt-1"
                                              onClick={this.fetchGames}
                                            >
                                              Ressayer
                                            </button>
                                          </div>
                                        )
                                      }
                                    </Menu.Item>
                                  ))}
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="hidden justify-center inset-y-0 sm:right-0 sm:top-0 items-center pr-2 sm:flex sm:relative">
                    <Search />

                    {/* Profile dropdown */}
                    {/* <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/"
                              className={classNames(
                                active ? "bg-slate-100" : "",
                                "block px-4 py-2 text-sm text-slate-700"
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/"
                              className={classNames(
                                active ? "bg-slate-100" : "",
                                "block px-4 py-2 text-sm text-slate-700"
                              )}
                            >
                              Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/"
                              className={classNames(
                                active ? "bg-slate-100" : "",
                                "block px-4 py-2 text-sm text-slate-700"
                              )}
                            >
                              Sign out
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu> */}
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 text-center menu-shadow">
                  <div className="mb-3 inset-y-0">
                    <Search />
                  </div>
                  {this.state.nav.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as={item.type === "href" ? "a" : Link}
                      // @ts-ignore
                      href={item.href}
                      to={item.href}
                      target={item.type === "href" ? "_blank" : undefined}
                      className={[
                        this.props.path === item.href
                          ? "text-white"
                          : "text-slate-300 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium transition-all",
                      ].join(" ")}
                      aria-current={
                        this.props.path === item.href ? "page" : undefined
                      }
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </>
    );
  }
}

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className="bg-slate-900">
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <a
            href="/"
            aria-label="Company"
            title="Company"
            className="inline-flex items-center"
          >
            <svg
              className="w-8 text-teal-accent-400"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeWidth="2"
              strokeLinecap="round"
              strokeMiterlimit="10"
              stroke="currentColor"
              fill="none"
            >
              <rect x="3" y="1" width="7" height="12" />
              <rect x="3" y="17" width="7" height="6" />
              <rect x="14" y="1" width="7" height="6" />
              <rect x="14" y="11" width="7" height="12" />
            </svg>
            <span className="ml-2 text-xl font-bold tracking-wide text-slate-100 uppercase">
              Company
            </span>
          </a>
          <ul className="flex items-center space-x-8 lg:flex">
            <li>
              <a
                href="/"
                aria-label="Our product"
                title="Our product"
                className="font-medium tracking-wide text-slate-100 transition-colors duration-200 hover:text-teal-accent-400"
              >
                Product
              </a>
            </li>
            <li>
              <a
                href="/"
                aria-label="Our product"
                title="Our product"
                className="font-medium tracking-wide text-slate-100 transition-colors duration-200 hover:text-teal-accent-400"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="/"
                aria-label="Product pricing"
                title="Product pricing"
                className="font-medium tracking-wide text-slate-100 transition-colors duration-200 hover:text-teal-accent-400"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="/"
                aria-label="About us"
                title="About us"
                className="font-medium tracking-wide text-slate-100 transition-colors duration-200 hover:text-teal-accent-400"
              >
                About us
              </a>
            </li>
          </ul>
          <ul className="flex items-center space-x-8 lg:flex">
            <li>
              <a
                href="/"
                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                aria-label="Sign up"
                title="Sign up"
              >
                Sign up
              </a>
            </li>
          </ul>
          <div className="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg className="w-5 text-slate-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full">
                <div className="p-5 bg-white border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <a
                        href="/"
                        aria-label="Company"
                        title="Company"
                        className="inline-flex items-center"
                      >
                        <svg
                          className="w-8 text-deep-purple-accent-400"
                          viewBox="0 0 24 24"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeMiterlimit="10"
                          stroke="currentColor"
                          fill="none"
                        >
                          <rect x="3" y="1" width="7" height="12" />
                          <rect x="3" y="17" width="7" height="6" />
                          <rect x="14" y="1" width="7" height="6" />
                          <rect x="14" y="11" width="7" height="12" />
                        </svg>
                        <span className="ml-2 text-xl font-bold tracking-wide text-slate-800 uppercase">
                          Company
                        </span>
                      </a>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-slate-200 focus:bg-slate-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 text-slate-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                      <li>
                        <a
                          href="/"
                          aria-label="Our product"
                          title="Our product"
                          className="font-medium tracking-wide text-slate-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          Product
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          aria-label="Our product"
                          title="Our product"
                          className="font-medium tracking-wide text-slate-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          Features
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          aria-label="Product pricing"
                          title="Product pricing"
                          className="font-medium tracking-wide text-slate-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          Pricing
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          aria-label="About us"
                          title="About us"
                          className="font-medium tracking-wide text-slate-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          About us
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                          aria-label="Sign up"
                          title="Sign up"
                        >
                          Sign up
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
