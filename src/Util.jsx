import { Component } from "react";
import "./styles/Buttons.scss";
import { Link } from "react-router-dom";

export class PrimaryButton extends Component {
  onHover = (e) => {
    const { x, y } = e.target.getBoundingClientRect();
    e.target.style.setProperty("--x", e.clientX - x);
    e.target.style.setProperty("--y", e.clientY - y);
  };
  render() {
    const className = this.props.className + " relative text-lg btn-primary rounded-[4px] py-[10px] px-6 inline-flex items-center justify-center text-white"
    return (
      <>
        {this.props.type === "link" ? (
          <Link
            to={this.props.href}
            className={className}
            onMouseMove={this.onHover}
          >
            {this.props.children}
          </Link>
        ) : this.props.type === "href" ? (
          <a
            href={this.props.href}
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
  render() {
    const className = this.props.className + " relative text-lg btn-secondary rounded-[4px] py-[10px] px-6 inline-flex items-center justify-center text-black"
    return (
      <>
        {this.props.type === "link" ? (
          <Link
            to={this.props.href}
            className={className}
            onMouseMove={this.onHover}
          >
            {this.props.children}
          </Link>
        ) : this.props.type === "href" ? (
          <a
            href={this.props.href}
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
    )
  }
}