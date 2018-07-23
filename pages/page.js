import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import Menu from "../components/Menu.js";
import { Config } from "../config.js";

class Page extends Component {
    static async getInitialProps(context) {
        const { slug, apiRoute } = context.query;
        const res = await fetch(
            `${Config.apiUrl}/wp-json/postlight/v1/${apiRoute}?slug=${slug}`
        );
        const page = await res.json();

        return { page };
    }

    render() {
            const {
                title,
                content
            } = this.props.page;

        if (!this.props.page.title){
            return(
                <Error statusCode={404} />
            );
        };

        return (
            <Layout>
                <Menu menu={this.props.headerMenu} />
                <div className="padTop">
                    <div className=" flex wrapper oneSeoGradient">
                        <div className="flex flexThree column">
                            <h1 className="white">{title.rendered}</h1>
                            <div
                            className="white"
                            dangerouslySetInnerHTML={{
                                __html: content.rendered
                            }}
                            />
                        </div>
                        <div className="flex flexOne column sidePadTop">
                            <iframe src="https://go.1seo.com/l/367991/2018-07-20/3mpw8" frameborder="0"></iframe>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default PageWrapper(Page);
