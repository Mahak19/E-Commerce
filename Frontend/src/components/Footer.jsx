import React from "react";
import { Link } from "react-router-dom";

// Footer component responsible for displaying footer content
const Footer = () => {
  return (
    <footer className="py-5 bg-body-tertiary">
      <div className="container">
        <div className="row g-4">
          {/* Address and contact information */}
          <div className="col-6 col-md-6 col-lg-3">
            <h6 className="text-dark mb-3 fw-bold text-uppercase">Address</h6>
            <p className="text-secondary">
              Katol, Nagpur <br />
              441302
            </p>
            <h6 className="text-dark fw-bold text text-uppercase">
              Contact Us
            </h6>
            <ul className="list-unstyled">
              <li>
                <a
                  className="text-decoration-none text-secondary small footer-link"
                  href="mailto::kanishmohariya1@gmail.com"
                >
                  fivecent@gmail.com
                </a>
              </li>
              <li>
                <a
                  className="text-decoration-none text-secondary small footer-link"
                  href="tel::8080908215"
                >
                  8080908215
                </a>
              </li>
            </ul>
          </div>

          {/* Help section */}
          <div className="col-6 col-md-6 col-lg-3">
            <h6 className="text-dark mb-3 fw-bold text-uppercase">Help</h6>
            <ul className="list-unstyled">
              <li className="mb-1">
                <Link
                  to={"/account"}
                  className="text-decoration-none text-secondary footer-link"
                  href=""
                >
                  My Account
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  to={"/store"}
                  className="text-decoration-none text-secondary footer-link"
                  href=""
                >
                  Items And Sizes
                </Link>
              </li>

              <li className="mb-1">
                <Link
                  to={"/orders"}
                  className="text-decoration-none text-secondary footer-link"
                  href=""
                >
                  Payment And Invoices
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  to={"/orders"}
                  className="text-decoration-none text-secondary footer-link"
                  href=""
                >
                  My Purchase
                </Link>
              </li>
              <li className="mb-1">
                <a
                  className="text-decoration-none text-secondary footer-link"
                  href=""
                >
                  Refund
                </a>
              </li>
            </ul>
          </div>

          {/* Company section */}
          <div className="col-6 col-md-6 col-lg-3">
            <h6 className="text-dark mb-3 fw-bold text-uppercase">Company</h6>
            <ul className="list-unstyled">
              <li className="mb-1">
                <a
                  className="text-decoration-none text-secondary footer-link"
                  href=""
                >
                  About Us
                </a>
              </li>
              <li className="mb-1">
                <a
                  className="text-decoration-none text-secondary footer-link"
                  href=""
                >
                  Contact Us
                </a>
              </li>
              <li className="mb-1">
                <a
                  className="text-decoration-none text-secondary footer-link"
                  href=""
                >
                  Careers
                </a>
              </li>
              <li className="mb-1">
                <a
                  className="text-decoration-none text-secondary footer-link"
                  href=""
                >
                  Stores
                </a>
              </li>
              <li className="mb-1">
                <a
                  className="text-decoration-none text-secondary footer-link"
                  href=""
                >
                  Report
                </a>
              </li>
            </ul>
          </div>

          {/* Social media and policies section */}
          <div className="col-6 col-md-6 col-lg-3">
            <h6 className="text-dark mb-3 fw-bold text-uppercase">
              Connect With Us
            </h6>
            <ul className="d-flex fs-5 list-unstyled">
              <li className="mx-2 ms-0">
                <a
                  className="text-decoration-none text-secondary footer-link"
                  href="https://www.facebook.com/login/"
                  target="_blank"
                >
                  <i className="fa-brands fa-facebook"></i>
                </a>
              </li>
              <li className="mx-2">
                <a
                  className="text-decoration-none text-secondary footer-link"
                  href="https://twitter.com/KMohariya"
                  target="_blank"
                >
                  <i className="fa-brands fa-square-x-twitter"></i>
                </a>
              </li>
              <li className="mx-2">
                <a
                  className="text-decoration-none text-secondary footer-link"
                  href="https://www.instagram.com/kanish_mohariya/"
                  target="_blank"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </li>
              <li className="mx-2">
                <a
                  className="text-decoration-none text-secondary footer-link"
                  href="https://www.linkedin.com/in/kanish-mohariya-7a904a240/"
                  target="_blank"
                >
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </li>
            </ul>

            {/* Policies section */}
            <h6 className="text-dark my-2 fw-bold text-uppercase">Policies</h6>
            <ul className="list-unstyled">
              <li>
                <a
                  className="text-decoration-none text-secondary footer-link"
                  href=""
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  className="text-decoration-none text-secondary footer-link"
                  href=""
                >
                  Refund Policy
                </a>
              </li>
              <li>
                <a
                  className="text-decoration-none text-secondary footer-link"
                  href=""
                >
                  T&C
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="row">
          <hr className="text-dark mb-4" />
          <div className="text-secondary d-flex justify-content-center">
            <p className="mb-0">
              <span>
                <i className="fa-regular fa-copyright"></i>
              </span>{" "}
              All Rights Reserved By KANISH I. MOHARIYA
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
