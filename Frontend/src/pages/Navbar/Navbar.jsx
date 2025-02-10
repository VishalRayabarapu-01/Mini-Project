import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ page }) {
  return (
    <nav
      className="navbar navbar-expand-sm bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Dog-Breed-Prediction
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${page === "home" ? "active" : ""}`}
                aria-current="page"
                to="/home"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${page === "about" ? "active" : ""}`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
