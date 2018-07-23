import Link from "next/link";
import Subscribe from "./Subscribe.js";


const Footer = () => (
    <div className="black">
        <div className="wrapper flex">
            <div className="flex column flexOne">
                <Link><a><img src="/static/images/footLogo.png" width="150" /></a></Link>
                <p className="white bigP">We solve business problems, take a consultative approach to every client engagement, and find actionable solutions that will help your organization.</p>
                <div className="flex spaceAround">
                    <Link href="https://www.facebook.com/1seoitdigital/"><a><i class="fourtyP facebook fa fa-facebook-f"></i></a></Link>
                    <Link href="https://www.youtube.com/user/1seocom"><a><i class="fourtyP youtube fa fa-youtube"></i></a></Link>
                    <Link href="https://www.instagram.com/1seoitdigital/"><a><i class="fourtyP instagram fa fa-instagram"></i></a></Link>
                    <Link href="https://twitter.com/1SEOITDigital"><a><i class="fourtyP twitter fa fa-twitter"></i></a></Link>
                    <Link href="https://plus.google.com/u/0/+1SEOcomDigitalAgency"><a><i class="fourtyP googlep fa fa-google-plus"></i></a></Link>
                </div>
            </div>
            <div className="flex column flexOne white">
                <Subscribe></Subscribe>
            </div>
            <div className="flex column flexOne">
                <h2 className="white">GET IN TOUCH</h2>
                <a className="white bigP linkFix" href="tel:215-946-1046">215-946-1046</a>
                <a className="white bigP linkFix" href="https://goo.gl/NGFRTc" target="_blank"><i class="fa fa-map"></i> Open in Google Maps</a>
            </div>
        </div>
    </div>
);

export default Footer;
