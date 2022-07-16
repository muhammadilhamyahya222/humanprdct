import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  Logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("role");
    localStorage.removeItem("id_user");
    window.location = "/";
  };

  navGuest = () => {
    return(
      <div className = "collapse navbar-collapse" id = "navbarNav">
        <ul className = "navbar-nav">
          <li className = "nav-item">
            <Link to="/product" className="nav-item nav-link text-light mr-4">Product</Link>
          </li>
          <li className = "nav-item">
            <Link to="/login" className="nav-item nav-link text-light mr-4">Login</Link>
          </li>
        </ul>
      </div>
    )
  }

  navAdmin = () => {
    return(
      <div className = "collapse navbar-collapse" id = "navbarNav">
        <ul className = "navbar-nav">
          <li className = "nav-item">
            <Link to="/products" className="nav-item nav-link text-light mr-4">Product</Link>
          </li>
          <li className = "nav-item">
            <Link to="/user" className="nav-item nav-link text-light mr-4">User</Link>
          </li>
          <li className = "nav-item">
            <a className="nav-item nav-link text-light mr-4" onClick={this.Logout}>Logout</a>
          </li>
        </ul>
      </div>
    )
  }

  navUser = () => {
    return(
      <div className = "collapse navbar-collapse" id = "navbarNav">
        <ul className = "navbar-nav">
          <li className = "nav-item">
            <Link to="/product" className="nav-item nav-link text-light mr-4">Product</Link>
          </li>
          <li className = "nav-item">
            <Link to="/profil" className="nav-item nav-link text-light mr-4">Profile</Link>
          </li>
          <li className = "nav-item">
            <a className="nav-item nav-link text-light mr-4" onClick={this.Logout}>Logout</a>
          </li>
        </ul>
      </div>
    )
  }
  render() {
    let auth = localStorage.getItem("Token")
    let role = JSON.parse(localStorage.getItem("role"));
    return(
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <a className="navbar-brand ml-5 text-danger"><b>HUMAN</b></a>
          <button className="navbar-toggler btn-light" type="button" data-toggle="collapse"
          data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          { !auth ? this.navGuest() : role === "Admin" ? this.navAdmin() : this.navUser()}
        </nav>
      </div>
    );
  }
}

export default Navbar;
