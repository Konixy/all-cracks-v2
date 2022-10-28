import { Component } from "react";
import config from "./config";
import { Link } from "react-router-dom";

interface Nav {
  name: string;
  href: string;
  type: "href" | "link";
}

export default class Footer extends Component {
  state: { nav: Nav[], style: string };
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      style: "text-gray-400 hover:text-white transition-all",
      nav: [
        {
          name: "Nous contacter",
          type: "href",
          href: "mailto:contact@spoticordbot.com",
        },
        { name: "Discord", type: "href", href: config.discordInvite },
        {
          name: "DMCA (conditions d'utilisation)",
          type: "link",
          href: "/dmca",
        },
        { name: "Admin Panel", type: "link", href: "/admin" },
      ],
    };
  }
  render() {
    return (
      <footer>
        <ul className="flex flex-row list-none justify-evenly mx-40">
          {this.state.nav.map((e) =>
            e.type === "href" ? (
              <li key={e.name}>
                <a href={e.href} rel="noreferrer" target="_blank" className={this.state.style}>{e.name}</a>
              </li>
            ) : (
              <li key={e.name}>
                <Link to={e.href} className={this.state.style}>{e.name}</Link>
              </li>
            )
          )}
        </ul>
        <div className="text-center my-10">
          <i className="fa-regular fa-copyright"></i> All-Cracks.fr 2022. Tout
          droits réservés. Développé par la{" "}
          <a
            href={config.nightCorpInvite}
            className="text-blue-400 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            NightCorp
          </a>
        </div>
      </footer>
    );
  }
}
