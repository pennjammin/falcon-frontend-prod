import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import PageWrapper from "../components/PageWrapper.js";
import Menu from "../components/Menu.js";
import { Config } from "../config.js";

class Index extends Component {

    static async getInitialProps(context) {
        const pageRes = await fetch(
            `${Config.apiUrl}/wp-json/postlight/v1/page?slug=welcome`
        );
        const page = await pageRes.json();
        return { page };
    }

    componentDidMount() {

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const f = document.getElementById("downButton");
                f.classList.remove("bouncer");
                f.classList.add("bouncer");
                setTimeout(() => {
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                }, 1000)
            });
        });

        var isInViewport = function (elem) {
            var bounding = elem.getBoundingClientRect();
            return (
                bounding.top >= 0 &&
                bounding.left >= 0 &&
                bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        };

        var numberOne = document.getElementById('imageOne');
        var numberTwo = document.getElementById('imageTwo');
        window.addEventListener('scroll', function (event) {
            if (isInViewport(numberOne)) {
                numberOne.classList.add("animated");
                numberOne.classList.add("flex");
                numberOne.classList.add("slideInRight");
            }
        }, false);
        window.addEventListener('scroll', function (event) {
            if (isInViewport(numberTwo)) {
                numberTwo.classList.add("animated");
                numberTwo.classList.add("flex");
                numberTwo.classList.add("slideInLeft");
            }
        }, false);
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
                <li>
                    <img
                        src={image.partner_image}
                        width="250"
                    />
                </li>
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
                <p>Hi Teague!</p>
                <video autoPlay muted loop id="heroVideo">
                    <source 
                            src={hero_section.hero_video_background}
                            type="video/mp4" 
                    />
                </video>
                <div className="home-hero flex column">
                    <div
                    dangerouslySetInnerHTML={{
                        __html: hero_section.hero_headline
                    }}
                    />
                    <div className="outerButton flex">
                    <Link href="#"><a className="homeButton flex"><img src="/static/images/statistics.png" width="30" /><h3>Learn More</h3></a></Link>
                    <Link href="#"><a className="homeButton flex"><img src="/static/images/list.png" width="30" /><h3>Free Evaluation</h3></a></Link>
                    </div>
                    <div><a id="two" href="#numberTwo"><img id="downButton" className="downButton" src="/static/images/downArrow.png" width="60" /></a></div>
                </div>
                <Menu menu={this.props.headerMenu} />
                <div className="heroGhost"></div>
                <div className="flex partnerSection">{imageRepeaterOne}</div>
                <div id="numberTwo" data-section="1" className="sectionTwo twoBlue">
                    <div className="wrapper flex column">
                            <div className="flex">
                                <div className="flex column">
                                    <h3>{section_two.digital_marketing.dm_headline}</h3>
                                    <img className="divideLeft" src="/static/images/divideRed.png" />
                                    <p>{section_two.digital_marketing.dm_paragraph}</p>
                                </div>
                                <div className="flex">
                                    <img id="imageOne" className="none" src={section_two.digital_marketing.dm_svg} />
                                </div>
                            </div>
                        <div className="center"><a id="three" href="#numberThree"><img id="downButton" className="downButton" src="/static/images/downArrowTwo.png" width="60" /></a></div>
                    </div>
                </div>
                <div id="numberThree" data-section="2" className="sectionTwo">
                    <div className="wrapper flex">
                        <div className="flex">
                            <img src={section_two.development.dev_svg} />
                        </div>
                        <div className="flex column">
                            <h3>{section_two.development.dev_headline}</h3>
                            <img id="imageTwo" className="none" className="divideRight" src="/static/images/divideRed.png" />
                            <p>{section_two.development.dev_paragraph}</p>
                            <div className="center"><a id="three" href="#numberFour"><img id="downButton" className="downButton" src="/static/images/downArrow.png" width="60" /></a></div>
                        </div>
                    </div>
                </div>
                <div id="numberFour" data-section="3" className="sectionTwo twoBlue">
                    <div className="wrapper flex alignItems">
                        <div className="flex column">
                            <h3>{section_two.managed_it_services.it_headline}</h3>
                            <img className="divideLeft" src="/static/images/divideRed.png" />
                            <p>{section_two.managed_it_services.it_paragraph}</p>
                        </div>
                        <div className="flex">
                            <img src={section_two.managed_it_services.it_svg} height="500" />
                        </div>
                    </div>
                </div>
                <div className="flex column sectionThree">
                    <h3>{section_three.section_three_headline}</h3>
                    <div className="flex">
                        <a className="standardButton" href={section_three.button_one.button_one_link}>{section_three.button_one.button_one_text}</a>
                        <a className="standardButton" href={section_three.button_two.button_two_link}>{section_three.button_two.button_two_text}</a>
                    </div>
                </div>
                <div className="flex section oneSeoGradient">
                    <div className="wrapper">
                        <h3 className="white">{section_four.s_four_headline}</h3>
                        <div className="flex">
                        <div className="flexTwo bigP white"
                            dangerouslySetInnerHTML={{
                            __html: section_four.s_four_paragraph
                            }}
                            />
                            <img  className="flexOne maxHeight" src={section_four.s_four_image} width="500" alt=""/>
                        </div>
                        <a className="standardButton" href={section_four.s_four_button.button_link}>{section_four.s_four_button.button_text}</a>
                    </div>
                </div>
                <div className="sectionSmallest">
                    <div className="wrapper flex">
                        <div className="flex flexThree">
                            <img className="twntyMargin" src={section_five.image} alt="" />
                        </div>
                        <div className="flex column twntyMargin flexTwo">
                            <h3 className="medHead">{section_five.headline}</h3>
                            <p className="bigP">{section_five.paragraph}</p>
                        </div>
                    </div>
                </div>
                <div className="sectionSmall oneSeoGradient">
                    <div className="wrapper flex column">
                        <div className="flex alignItems spaceAround">
                            <div className="flex column">
                                <div 
                                    className="bigHead white"
                                    dangerouslySetInnerHTML={{
                                    __html:section_six.headline
                                     }} 
                                     />
                                <h4 className="medHead white marginBottom">{section_six.sub_headline}</h4>
                            </div>
                            <a className="standardButton" href={section_six.button.button_link}>{section_six.button.button_text}</a>
                        </div>
                        <div className="flex spaceAround">
                            {imageRepeaterTwo}
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default PageWrapper(Index);
