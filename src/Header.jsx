import { Fragment, Component, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import config from "./config";
import axios from "axios";
import ContentLoader from "react-content-loader";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.props = props;
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
  searchInput = (input) => {
    const value = input.target.value;

    if (value.length <= 0) return this.closeSearch();
    else this.openSearch(input);
  };
  fetchGames = async () => {
    const request = await axios.get(`${config.backendPath}/api/header/games`);
    const dropdownItems = this.state.nav.find(
      (e) => e.name === "Jeux"
    ).dropdownItems;
    dropdownItems.pop();
    request.data.games.forEach((e) => {
      dropdownItems.push({
        type: "link",
        name: e.name,
        href: "/game/" + e._id,
      });
    });
    this.setState(this.state);
  };
  componentDidMount() {
    this.fetchGames();
  }
  openSearch = (input) => {
    console.log('openned with "%s"', input.target.value);
  };
  closeSearch = () => {
    console.log("closed");
  };
  render() {
    return (
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center justify-center text-white text-goodtime text-2xl">
                    <Link to="/" className="block h-8 w-auto lg:hidden">
                      All-Cracks.fr
                    </Link>
                    <Link to="/" className="hidden h-8 w-auto lg:block">
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
                                : "text-gray-400 hover:text-white",
                              "px-3 py-2 rounded-md text-base font-medium transition-all",
                            ].join(" ")}
                            aria-current={
                              this.props.path === item.href ? "page" : undefined
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
                                : "text-gray-400 hover:text-white",
                              "px-3 py-2 rounded-md text-base font-medium transition-all",
                            ].join(" ")}
                            aria-current={
                              this.props.path === item.href ? "page" : undefined
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
                                    : "text-gray-400 hover:text-white focus:text-white",
                                  "px-3 py-2 rounded-md text-base font-medium transition-all flex items-center justify-center bg-gray-800 outline-none",
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
                              <Menu.Items className="absolute -right-[50%] translate-x-[10px] z-10 mt-2 w-48 origin-center rounded-md bg-gray-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {item.dropdownItems.map((e) => (
                                  <Menu.Item key={e.name}>
                                    {({ active }) =>
                                      e.type === "link" ? (
                                        <Link
                                          key={e.name}
                                          to={e.href}
                                          className={classNames(
                                            active ? "bg-gray-600" : "",
                                            "block px-3 mx-2 rounded-md py-2 my-1 text-sm text-white text-ellipsis overflow-hidden whitespace-nowrap select-none"
                                          )}
                                        >
                                          {e.name}
                                        </Link>
                                      ) : e.type === "hr" ? (
                                        <div
                                          key={e.type}
                                          className="relative mx-3 mt-2 rounded-sm border-b-gray-500 border-b-[1px]"
                                        ></div>
                                      ) : e.type === "text" ? (
                                        <div
                                          key={e.type}
                                          className="relative mb-1 mt-2 text-center text-gray-400 text-xs font-semibold"
                                        >
                                          {e.text}
                                        </div>
                                      ) : (
                                        <ContentLoader 
                                          speed={2}
                                          width={192}
                                          height={200}
                                          viewBox="0 0 192 200"
                                          backgroundColor="#4b5563"
                                          foregroundColor="#6b7280"
                                          className="px-3 relative outline-none"
                                        >
                                          <rect x="0" y="0" rx="8" ry="8" width="190" height="30" className="mt-2" />
                                          <rect x="0" y="40" rx="8" ry="8" width="190" height="30" className="mt-2" />
                                          <rect x="0" y="80" rx="8" ry="8" width="190" height="30" className="mt-2" />
                                          <rect x="0" y="120" rx="8" ry="8" width="190" height="30" className="mt-2" />
                                          <rect x="0" y="160" rx="8" ry="8" width="190" height="30" className="mt-2" />
                                        </ContentLoader>
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
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:flex sm:relative">
                  <div className="relative mt-3">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none text-gray-500">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <input
                      type="text"
                      id="search-navbar"
                      className="block p-2 pl-8 w-full rounded-lg border sm:text-sm bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:ring-1 focus:border-blue-500 outline-none transition-all"
                      placeholder="Search..."
                      onInput={this.searchInput}
                    />
                  </div>

                  {/* Profile dropdown */}
                  {/* <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
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
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
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
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
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
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
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
              <div className="space-y-1 px-2 pt-2 pb-3">
                {this.state.nav.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={item.external ? "a" : Link}
                    href={item.href}
                    to={item.href}
                    target={item.external ? "_blank" : undefined}
                    className={[
                      this.props.path === item.href
                        ? "text-white"
                        : "text-gray-300 hover:text-white",
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
    );
  }
}

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div class="bg-gray-900">
      <div class="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div class="relative flex items-center justify-between">
          <a
            href="/"
            aria-label="Company"
            title="Company"
            class="inline-flex items-center"
          >
            <svg
              class="w-8 text-teal-accent-400"
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
            <span class="ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase">
              Company
            </span>
          </a>
          <ul class="flex items-center hidden space-x-8 lg:flex">
            <li>
              <a
                href="/"
                aria-label="Our product"
                title="Our product"
                class="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
              >
                Product
              </a>
            </li>
            <li>
              <a
                href="/"
                aria-label="Our product"
                title="Our product"
                class="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="/"
                aria-label="Product pricing"
                title="Product pricing"
                class="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="/"
                aria-label="About us"
                title="About us"
                class="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
              >
                About us
              </a>
            </li>
          </ul>
          <ul class="flex items-center hidden space-x-8 lg:flex">
            <li>
              <a
                href="/"
                class="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                aria-label="Sign up"
                title="Sign up"
              >
                Sign up
              </a>
            </li>
          </ul>
          <div class="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              class="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
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
              <div class="absolute top-0 left-0 w-full">
                <div class="p-5 bg-white border rounded shadow-sm">
                  <div class="flex items-center justify-between mb-4">
                    <div>
                      <a
                        href="/"
                        aria-label="Company"
                        title="Company"
                        class="inline-flex items-center"
                      >
                        <svg
                          class="w-8 text-deep-purple-accent-400"
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
                        <span class="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                          Company
                        </span>
                      </a>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        class="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul class="space-y-4">
                      <li>
                        <a
                          href="/"
                          aria-label="Our product"
                          title="Our product"
                          class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          Product
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          aria-label="Our product"
                          title="Our product"
                          class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          Features
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          aria-label="Product pricing"
                          title="Product pricing"
                          class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          Pricing
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          aria-label="About us"
                          title="About us"
                          class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          About us
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          class="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
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
