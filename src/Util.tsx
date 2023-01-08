import React, { Component, MouseEvent } from 'react';
import './styles/Buttons.scss';
import { Link } from 'react-router-dom';

interface Props {
  type: string;
  props: React.HTMLProps<HTMLButtonElement | HTMLLinkElement>;
}

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export class PrimaryButton extends Component {
  type: string;
  props: React.HTMLProps<HTMLButtonElement | HTMLLinkElement>;
  constructor(props: Props) {
    super(props);
    this.type = props.type;
    this.props = props;
  }
  onHover = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const { x, y } = target?.getBoundingClientRect();
    target?.style.setProperty('--x', String(event.clientX - x));
    target?.style.setProperty('--y', String(event.clientY - y));
  };
  render() {
    const className = this.props.className + ' relative text-lg btn-primary rounded-[4px] py-[10px] px-6 inline-flex items-center justify-center text-white';
    const href = this.props.href ? this.props.href : '/';
    return (
      <>
        {this.props.type === 'link' ? (
          <Link to={href} className={className} onMouseMove={this.onHover}>
            {this.props.children}
          </Link>
        ) : this.props.type === 'href' ? (
          <a href={href} target="_blank" rel="noreferrer" className={className} onMouseMove={this.onHover}>
            {this.props.children}
          </a>
        ) : (
          <button onClick={this.props.onClick} className={className} onMouseMove={this.onHover}>
            {this.props.children}
          </button>
        )}
      </>
    );
  }
}

export class SecondaryButton extends Component {
  type: string;
  props: React.HTMLProps<HTMLButtonElement | HTMLLinkElement>;
  constructor(props: Props) {
    super(props);
    this.type = props.type;
    this.props = props;
  }
  render() {
    const className = this.props.className + ' relative text-lg btn-secondary rounded-[4px] py-[10px] px-6 inline-flex items-center justify-center text-black';
    return (
      <>
        {this.props.type === 'link' ? (
          <Link to={this.props.href ? this.props.href : '/'} className={className}>
            {this.props.children}
          </Link>
        ) : this.props.type === 'href' ? (
          <a href={this.props.href} target="_blank" rel="noreferrer" className={className}>
            {this.props.children}
          </a>
        ) : (
          <button onClick={this.props.onClick} className={className}>
            {this.props.children}
          </button>
        )}
      </>
    );
  }
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
