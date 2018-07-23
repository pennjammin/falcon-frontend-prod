import Link from "next/link";
import Subscribe from "./Subscribe.js";


const Footer = () => (
    <div className="black">
        <div className="wrapper flex">
            <Link><a><img src="/static/images/footLogo.png" width="100" /></a></Link>
            <h2>GET IN TOUCH</h2>
            <a href="tel:215-946-1046">215-946-1046</a>
            <a href="https://goo.gl/NGFRTc" target="_blank"><i class="fa fa-map"></i> Open in Google Maps</a>
            <Subscribe></Subscribe>
        </div>
    </div>
);

export default Footer;
