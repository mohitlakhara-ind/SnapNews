import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5 mt-5 sticky-bottom">
      <Container>
        <Row className="text-center text-md-start">
          {/* SnapNews Section */}
          <Col md={4} sm={12} className="mb-4 mb-md-0">
            <h5 className="text-uppercase">SnapNews</h5>
            <p>Your go-to source for the latest and trending news!</p>
          </Col>

          {/* Quick Links Section */}
          <Col md={4} sm={12} className="mb-4 mb-md-0">
            <h5 className="text-uppercase">Quick Links</h5>
            <Nav className="flex-column">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/business">Business</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/entertainment">Entertainment</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/health">Health</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/science">Science</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sports">Sports</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/technology">Technology</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">About</Link>
                </li>
              </ul>
            </Nav>
          </Col>

          {/* Social Media Section */}
          <Col md={4} sm={12} className="mb-4 mb-md-0">
            <h5 className="text-uppercase">Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-start">
              <a href="https://facebook.com" className="text-white mx-3 footer-icon">
                <FaFacebook size={28} />
              </a>
              <a href="https://twitter.com" className="text-white mx-3 footer-icon">
                <FaTwitter size={28} />
              </a>
              <a href="https://instagram.com" className="text-white mx-3 footer-icon">
                <FaInstagram size={28} />
              </a>
              <a href="https://linkedin.com" className="text-white mx-3 footer-icon">
                <FaLinkedin size={28} />
              </a>
            </div>
          </Col>
        </Row>

        {/* Copyright Section */}
        <Row>
          <Col className="text-center mt-4">
            <p className="mb-0">&copy; {new Date().getFullYear()} SnapNews. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
