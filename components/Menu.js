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

  componentDidMount() {

    const menuChange = document.getElementById('homeNav');
    menuChange.classList.add('absolute');

    window.onscroll = function() {headShrinker()};

    function headShrinker() {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            var y = document.getElementById("homeNav");
            y.classList.remove("absolute");
            y.classList.add("sticky");
            var z = document.getElementById("logo");
            z.classList.remove("logo");
            z.classList.add("miniLogo");
            var t = document.getElementById("hidden");
            t.classList.remove("none");
            t.classList.add("flex");
        } else {
            var y = document.getElementById("homeNav");
            y.classList.remove("sticky");
            y.classList.add("absolute");
            var z = document.getElementById("logo");
            z.classList.add("logo");
            z.classList.remove("miniLogo");
            var t = document.getElementById("hidden");
            t.classList.add("none");
            t.classList.remove("flex");
        }
    }
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
                id="logo"
                className="logo"
            /></a>
        </Link> 
        {menuItems}
        <Link
            href="/blog">
            <a>Blog</a>
        </Link>
        <Link href="tel:215-946-1046">
        <a>
        <i id="hidden" className="fa fa-phone thirtyP none"></i>
        </a>
        </Link>
      </div>
    )
  }


}

export default Menu;
