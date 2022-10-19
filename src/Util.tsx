import React, { ButtonHTMLAttributes, Component, DetailedHTMLProps, MouseEventHandler } from "react";
import "./styles/Buttons.scss";
import { Link } from "react-router-dom";
import Jquery from "jquery"

document.querySelector(".zebi")?.addEventListener("input", e => {})

interface PropsType {
  type: string
}

export class PrimaryButton extends Component {
  type: string;
  props: React.HTMLProps<HTMLButtonElement | HTMLLinkElement>;
  constructor(props: PropsType) {
    super(props)
    this.type = props.type
  }
  onHover = (event) => {
    const { x, y } = event.target?.getBoundingClientRect();
    event.target?.style.setProperty("--x", String(event.clientX - x));
    event.target?.style.setProperty("--y", String(event.clientY - y));
  };
  render() {
    const className = this.props.className + " relative text-lg btn-primary rounded-[4px] py-[10px] px-6 inline-flex items-center justify-center text-white"
    const href = this.props.href ? this.props.href : "/";
    return (
      <>
        {this.props.type === "link" ? (
          <Link
            to={href}
            className={className}
            onMouseMove={this.onHover}
          >
            {this.props.children}
          </Link>
        ) : this.props.type === "href" ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className={className}
            onMouseMove={this.onHover}
          >
            {this.props.children}
          </a>
        ) : (
          <button
            onClick={this.props.onClick}
            className={className}
            onMouseMove={this.onHover}
          >
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
  render() {
    const className = this.props.className + " relative text-lg btn-secondary rounded-[4px] py-[10px] px-6 inline-flex items-center justify-center text-black"
    return (
      <>
        {this.props.type === "link" ? (
          <Link
            to={this.props.href ? this.props.href : "/"}
            className={className}
          >
            {this.props.children}
          </Link>
        ) : this.props.type === "href" ? (
          <a
            href={this.props.href}
            target="_blank"
            rel="noreferrer"
            className={className}
          >
            {this.props.children}
          </a>
        ) : (
          <button
            onClick={this.props.onClick}
            className={className}
          >
            {this.props.children}
          </button>
        )}
      </>
    )
  }
}