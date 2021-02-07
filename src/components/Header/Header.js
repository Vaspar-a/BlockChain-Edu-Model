import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./header.css";

class Header extends Component {
  constructor(props) {
    super(props);

    this["navLinks"] = React.createRef();
    this.refers = {};

    this.handleOnClickLi = this.handleOnClickLi.bind(this);
    this.openMenu = this.openMenu.bind(this);

    this.props.menus.forEach((menu) => {
      this["refers"][menu.text] = React.createRef();
    });
  }

  handleOnClickLi(event) {
    event.stopPropagation();
    this.activeMenu.current.classList.remove("active");
    this.activeMenu = this.refers[event.target.parentNode.parentNode.id];
    this.activeMenu.current.classList.add("active");

    this.openMenu(event);
  }

  openMenu(event) {
    event.stopPropagation();
    this["navLinks"].current.classList.toggle("nav-links-active");
    for (const ref in this.refers) {
      if (this.refers.hasOwnProperty(ref)) {
        const element = this["refers"][ref];
        element.current.classList.toggle("li-fade");
      }
    }
  }

  render() {
    const liElements = this.props.menus.map((menu, index) => {
      return index === 0 ? (
        <li
          className={"active"}
          ref={this["refers"][menu.text]}
          id={menu.text}
          key={menu.text}
          onClick={this.handleOnClickLi}
        >
          <Link to={menu.link} className="list-style">
            {/* <img className={"menu-img"} src={menu.img} alt={menu.alt}></img> */}
            <span className={"menu-text"}>{menu.text}</span>
          </Link>
        </li>
      ) : (
        <li
          ref={this["refers"][menu.text]}
          id={menu.text}
          key={menu.text}
          onClick={this.handleOnClickLi}
        >
          <Link to={menu.link} className="list-style">
            {/* <img className={"menu-img"} src={menu.img} alt={menu.alt}></img> */}
            <span className={"menu-text"}>{menu.text}</span>
          </Link>
        </li>
      );
    });
    this.activeMenu = this.refers[this.props.menus[0].text];

    return (
      <header>
        <nav className={"nav-logo"}>
          <i
            className={"img"}
            style={{
              content: `url(${process.env.PUBLIC_URL}/assets/images/Charusat\\ Logo.png)`,
            }}
          ></i>
          {/* <h3 className="logo-name">Logo</h3> */}
        </nav>
        <div id="menu-bar" onClick={this.openMenu}>
          <div className="stick s1"></div>
          <div className="stick s2"></div>
          <div className="stick s3"></div>
        </div>
        <ul className={"nav-links"} ref={this["navLinks"]}>
          {liElements}
        </ul>
      </header>
    );
  }
}

export default Header;
