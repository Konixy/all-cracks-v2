import React, { ComponentProps, MouseEvent } from 'react';
import './styles/Buttons.scss';
import { Link } from 'react-router-dom';

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export function PrimaryButton({
  type,
  onClick,
  href,
  ...Props
}: { type: 'link' | 'href' | 'button'; onClick?: React.MouseEventHandler<HTMLButtonElement>; href?: string } & ComponentProps<'link' | 'a' | 'button'>) {
  function onHover(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const { x, y } = target.getBoundingClientRect();
    target?.style.setProperty('--x', String(event.clientX - x));
    target?.style.setProperty('--y', String(event.clientY - y));
  }
  const className = Props.className + ' relative text-lg btn-primary rounded-[4px] py-[10px] px-6 inline-flex items-center justify-center text-white';
  return (
    <>
      {type === 'link' ? (
        <Link to={href || '/'} className={className} onMouseMove={onHover}>
          {Props.children}
        </Link>
      ) : type === 'href' ? (
        <a href={href} target="_blank" rel="noreferrer" className={className} onMouseMove={onHover}>
          {Props.children}
        </a>
      ) : (
        <button onClick={onClick} className={className} onMouseMove={onHover}>
          {Props.children}
        </button>
      )}
    </>
  );
}

export function SecondaryButton({
  type,
  onClick,
  href,
  ...Props
}: { type: 'link' | 'href' | 'button'; onClick?: React.MouseEventHandler<HTMLButtonElement>; href?: string } & ComponentProps<'link' | 'a' | 'button'>) {
  const className = Props.className + ' relative text-lg btn-secondary rounded-[4px] py-[10px] px-6 inline-flex items-center justify-center text-black';
  return (
    <>
      {type === 'link' ? (
        <Link to={href ? href : '/'} className={className}>
          {Props.children}
        </Link>
      ) : type === 'href' ? (
        <a href={href} target="_blank" rel="noreferrer" className={className}>
          {Props.children}
        </a>
      ) : (
        <button onClick={onClick} className={className}>
          {Props.children}
        </button>
      )}
    </>
  );
}

export function NoConnection({ retry }: { retry: () => void }) {
  return (
    <div className="my-20 text-center">
      <div>
        <i className="fa-solid fa-warning text-8xl text-orange-400"></i>
        <div className="mt-4 text-3xl">Connexion impossible</div>
      </div>
      <div className="text-md mt-4 text-slate-400">Vérifiez votre connexion internet et réessayez</div>
      <button className="mt-8 rounded-md bg-slate-300 py-2 px-6 text-xl text-black transition-all hover:bg-slate-200" onClick={retry}>
        Ressayer
      </button>
    </div>
  );
}
