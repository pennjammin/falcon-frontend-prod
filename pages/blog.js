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
                <ul key={index}>
                    <li>
                        <Link
                            as={`/blog/${post.slug}`}
                            href={`/blog?slug=${post.slug}&apiRoute=post`}
                        >
                            <a>{post.title.rendered}</a>
                        </Link>
                    </li>
                </ul>
            );
            });

        if (!this.props.post.title){
            return (
                <Layout>
                    <Menu menu={this.props.headerMenu} />
                    <div>
                    <h1>Posts</h1>
                    {posts}
                    </div>
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
