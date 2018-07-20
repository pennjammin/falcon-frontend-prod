import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import Menu from "../components/Menu.js";
import { Config } from "../config.js";
import Link from "next/link";

class Blog extends Component {
    static async getInitialProps(context) {
        const { slug, apiRoute } = context.query;
        const res = await fetch(
            `${Config.apiUrl}/wp-json/postlight/v1/${apiRoute}?slug=${slug}`
        );
        const post = await res.json();

        const postsRes = await fetch(
            `${Config.apiUrl}/wp-json/wp/v2/posts?_embed`
        );
        const posts = await postsRes.json();

        return { post, posts };
    }

    render() {
        const posts = this.props.posts.map((post, index) => {
            return (
                    <li>
                        <h2>{post.title.rendered}</h2>
                        <div>{post.featued_media}</div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: post.excerpt.rendered
                        }}
                />
                    </li>
            );
            });

        if (!this.props.post.title){
            return (
                <Layout>
                    <Menu menu={this.props.headerMenu} />
                    <div>
                        <h1>Posts</h1>
                        <ul>{posts}</ul>
                    </div>
                    <iframe src="https://go.1seo.com/l/367991/2018-07-20/3mpcl" frameborder="0"></iframe>
                </Layout>
            )
        };

        return (
            <Layout>
                <Menu menu={this.props.headerMenu} />
                <h1>{this.props.post.title.rendered}</h1>
                <div
                    dangerouslySetInnerHTML={{
                        __html: this.props.post.content.rendered
                    }}
                />
            </Layout>
        );
    }
}

export default PageWrapper(Blog);
