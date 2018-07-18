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
        const { 
            hero_section,
            section_one,
            section_two,
            section_three,
            section_four,
            section_five,
            section_six,
         } = this.props.page.acf;

         const imageRepeaterOne = section_one.partner_images.map((image, index) => {
            return (
                <ul key={index}>
                    <img
                        src={image.partner_image}
                        width="75"
                    />
                </ul>
            );
         });

         const imageRepeaterTwo = section_six.images.map((image, index) => {
            return (
                <ul key={index}>
                    <img
                        src={image.image}
                    />
                </ul>
            );
         });
         
        return (
            <Layout>
                <Menu menu={this.props.headerMenu} />
                <h1>{hero_section.hero_headline}</h1>
                <div>{imageRepeaterOne}</div>
                <div>{section_two.digital_marketing.dm_headline}</div>
                <div>{section_two.digital_marketing.dm_paragraph}</div>
                <img src={section_two.digital_marketing.dm_svg} />
                <div>{section_two.development.dev_headline}</div>
                <div>{section_two.development.dev_paragraph}</div>
                <img src={section_two.development.dev_svg} />
                <div>{section_two.managed_it_services.it_headline}</div>
                <div>{section_two.managed_it_services.it_paragraph}</div>
                <img src={section_two.managed_it_services.it_svg} />
                <div>{section_three.section_three_headline}</div>
                <a href={section_three.button_one.button_one_link}>{section_three.button_one.button_one_text}</a>
                <br/><a href={section_three.button_two.button_two_link}>{section_three.button_two.button_two_text}</a>
                <div>{section_four.s_four_headline}</div>
                <div>{section_four.s_four_paragraph}</div>
                <img src={section_four.s_four_image} alt=""/>
                <a href={section_four.s_four_button.button_link}>{section_four.s_four_button.button_text}</a>
                <img src={section_five.image} alt=""/>
                <div>{section_five.headline}</div>
                <div>{section_five.paragraph}</div>
                <div>{section_six.headline}</div>
                <div>{section_six.sub_headline}</div>
                <div>{imageRepeaterTwo}</div>
                <a href={section_six.button.button_link}>{section_six.button.button_text}</a>
            </Layout>
        );
    }
}

export default PageWrapper(Index);
