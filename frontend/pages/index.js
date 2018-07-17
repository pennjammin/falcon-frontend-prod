import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import PageWrapper from "../components/PageWrapper.js";
import Menu from "../components/Menu.js";
import { Config } from "../config.js";

const headerImageStyle = {
    marginTop: 50,
    marginBottom: 50
};

class Index extends Component {
    static async getInitialProps(context) {
        const pageRes = await fetch(
            `${Config.apiUrl}/wp-json/postlight/v1/page?slug=welcome`
        );
        const page = await pageRes.json();
        return { page };
    }

    render() {
        const repeater = this.props.page.acf.test.map((test, index) => {
            return (
                <ul key={index}>
                    <li>
                        {test.tester}
                    </li>
                </ul>
            );
        });
        return (
            <Layout>
                <Menu menu={this.props.headerMenu} />
                <h1>{this.props.page.title.rendered}</h1>
                <div
                    dangerouslySetInnerHTML={{
                        __html: this.props.page.content.rendered
                    }}
                />
                {repeater}
                <h2>Posts</h2>
                {posts}
                <h2>Pages</h2>
                {pages}
            </Layout>
        );
    }
}

export default PageWrapper(Index);
