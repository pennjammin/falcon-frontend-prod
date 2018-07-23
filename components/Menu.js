import React, { Component } from "react";
import Link from "next/link";
import { Config } from "../config.js";

const linkStyle = {
    marginRight: 15
};

class Menu extends Component {
  constructor() {
      super();
  }

  getSlug(url) {
      const parts = url.split("/");
      return parts.length > 2 ? parts[parts.length - 2] : "";
  }

  render() {
      const menuItems = this.props.menu.items.map((item, index) => {
        if (item.object === "custom") {
            return (
                <Link href={item.url} key={item.ID}>
                    <a style={linkStyle}>{item.title}</a>
                </Link>
            );
        }
        const slug = this.getSlug(item.url);
        const actualPage = item.object === "category" ? "category" : "page";
        return (
            <Link
                as={`/${actualPage}/${slug}`}
                href={`/${actualPage}?slug=${slug}&apiRoute=${item.object}`}
                key={item.ID}
            >
                <a style={linkStyle}>{item.title}</a>
            </Link>
        );
    });


    return(
      <div id="homeNav" className="mainNav flex">
        <Link href="/">
            <a><img 
                src="/static/images/logo.png"
                width="150px"
                className="logo"
            /></a>
        </Link> 
        {menuItems}
      </div>
    )
  }


}

export default Menu;
