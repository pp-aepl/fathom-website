import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <section className="footerSection">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4">
              <ul className="socialMedia">
                <li>
                  <Link href="#" target="_blank">
                    <FaFacebookF />
                  </Link>
                </li>
                <li>
                  <Link href="#" target="_blank">
                    <FaTwitter />
                  </Link>
                </li>
                <li>
                  <Link href="#" target="_blank">
                    <FaLinkedinIn />
                  </Link>
                </li>
                <li>
                  <Link href="#" target="_blank">
                    <FaInstagram />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-8">
              <ul className="ftLink">
                <li>
                  <Link href="#" target="_blank">
                    Faq
                  </Link>
                </li>
                <li>
                  <Link href="#" target="_blank">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="#" target="_blank">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <hr className="border-white"></hr>
          <div className="row justify-content-center pt-3">
            <div className="col-md-12 tex-center text-white">
              <p className="text-center copyRight">
                Copyright © 2024 Turnkey Inc. All Rights Reserved. Use of this
                website signifies your agreement with our Terms & Conditions,
                Privacy Policy, Purchase Policy and Cookies [version 1.7.26 ]
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Footer;
