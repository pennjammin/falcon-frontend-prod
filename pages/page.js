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

        if (title.rendered = 'Contact Us'){
            return(
            <Layout>
                <Menu menu={this.props.headerMenu} />
                <h1>{title.rendered}</h1>
                <iframe src="https://go.1seo.com/l/367991/2018-07-20/3mpcl" frameborder="0"></iframe>
                <div
                    dangerouslySetInnerHTML={{
                        __html: content.rendered
                    }}
                />
            </Layout>
            );
        };

        return (
            <Layout>
                <Menu menu={this.props.headerMenu} />
                <h1>{title.rendered}</h1>
                <div
                    dangerouslySetInnerHTML={{
                        __html: content.rendered
                    }}
                />
            </Layout>
        );
    }
}

export default PageWrapper(Page);
