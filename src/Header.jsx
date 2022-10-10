import { Fragment, Component } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import config from "./config";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      nav: [
        { name: "Acceuil", type: "link", href: "/", current: true },
        {
          name: "Jeux",
          type: "dropdown",
          href: "/games",
          current: false,
          dropdownItems: [
            { name: "test", href: "test" },
            { name: "test2", href: "test2" },
          ],
        },
        {
          name: "Discord",
          type: "href",
          href: config.discordInvite,
          current: false,
        },
        { name: "Support", type: "link", href: "/support", current: false },
      ],
    };
  }
  searchInput = (input) => {
    const value = input.target.value;

    if (value.length <= 0) return this.closeSearch();
    else this.openSearch(input);
  };
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
                              item.current
                                ? "text-white"
                                : "text-gray-400 hover:text-white",
                              "px-3 py-2 rounded-md text-base font-medium transition-all",
                            ].join(" ")}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ) : item.type === "link" ? (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={[
                              item.current
                                ? "text-white"
                                : "text-gray-400 hover:text-white",
                              "px-3 py-2 rounded-md text-base font-medium transition-all",
                            ].join(" ")}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        ) : (
                          <Menu as="div" className="relative">
                            <div>
                              <Menu.Button
                                className={[
                                  item.current
                                    ? "text-white"
                                    : "text-gray-400 hover:text-white focus:text-white",
                                  "px-3 py-2 rounded-md text-base font-medium transition-all flex items-center justify-center bg-gray-800 outline-none",
                                ].join(" ")}
                              >
                                <span className="sr-only">Ouvrir la liste des jeux</span>
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
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-center rounded-md bg-gray-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {item.dropdownItems.map((e) => (
                                  <Menu.Item key={e.name}>
                                    {({ active }) => (
                                      <Link
                                        to={e.href}
                                        className={classNames(
                                          active ? "bg-gray-600" : "",
                                          "block px-4 py-2 text-sm text-white"
                                        )}
                                      >
                                        {e.name}
                                      </Link>
                                    )}
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
                      item.current
                        ? "text-white"
                        : "text-gray-300 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium transition-all",
                    ].join(" ")}
                    aria-current={item.current ? "page" : undefined}
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
