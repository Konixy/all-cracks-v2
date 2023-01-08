import React from 'react';
import config from './config';
import { Link } from 'react-router-dom';

export default function Footer() {
  const footer = {
    style: 'text-slate-400 hover:text-white transition-all mb-2 md:mb-0',
    nav: [
      {
        name: 'Nous contacter',
        type: 'href',
        href: 'mailto:contact@all-cracks.fr',
      },
      { name: 'Discord', type: 'href', href: config.discordInvite },
      {
        name: "DMCA (conditions d'utilisation)",
        type: 'link',
        href: '/dmca',
      },
      // { name: "Admin Panel", type: "link", href: "/admin" },
    ],
  };
  return (
    <footer>
      <ul className="mx-10 flex list-none flex-col items-center justify-between sm:mx-20 md:mx-40 md:flex-row lg:justify-evenly">
        {footer.nav.map((e) =>
          e.type === 'href' ? (
            <li key={e.name}>
              <a href={e.href} rel="noreferrer" target="_blank" className={footer.style}>
                {e.name}
              </a>
            </li>
          ) : (
            <li key={e.name}>
              <Link to={e.href} className={footer.style}>
                {e.name}
              </Link>
            </li>
          ),
        )}
      </ul>
      <div className="my-10 text-center">
        <i className="fa-regular fa-copyright"></i> All-Cracks.fr 2022. Tout droits réservés. Développé par la{' '}
        <a href={config.nightCorpInvite} className="text-blue-400 hover:underline" target="_blank" rel="noreferrer">
          NightCorp
        </a>
      </div>
    </footer>
  );
}
