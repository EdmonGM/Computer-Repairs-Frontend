import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "../components/navbar/NavLink";

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Computer Repairs
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapseItems"
          aria-controls="navbarCollapseItems"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapseItems">
          <ul className="navbar-nav">
            <NavLink path="profile" title="Profile" />
            <NavLink path="tickets" title="Tickets" />
            <NavLink path="about" title="About" />
          </ul>
        </div>
      </div>
    </nav>
  );
}
