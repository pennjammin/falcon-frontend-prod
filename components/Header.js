import React, { Component } from "react";
import Link from "next/link";
import Head from "next/head";
import Menu from "./Menu.js";
import { Config } from "../config.js";
import stylesheet from '../src/styles/style.scss'
import Intercom from 'react-intercom';

class Header extends Component {
    constructor() {
        super();
    }

    render() {

        return (
            <div>
                <Head>
                    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <meta charSet="utf-8" />
                    <title>
                        WordPress + React Starter Kit Frontend by Postlight
                    </title>
                </Head>
                <Intercom appID="vmn0i5pf"/>
                <Link href="tel:215-946-1046">
        <a className="contactButton flex spaceAround alignItems"><i className="fa fa-phone"></i><p className="marginZero">Call Now: 215-946-1046</p></a></Link>
            </div>
        );
    }
}

export default Header;
