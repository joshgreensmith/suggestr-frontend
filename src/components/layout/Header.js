import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <li className="nav-item">
          <span className="navbar-text mr-3">
            <strong>{user ? `${user.username}` : ''}</strong>
          </span>
        </li>
        <li className="nav-item">
          <span
            onClick={this.props.logout}
            className="nav-link btn btn-info btn-sm text-light"
          >
            Logout
          </span>
        </li>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        {/* <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li> */}
        <li className="nav-item">
          <Link to="/login" className="nav-link btn btn-info btn-sm text-light">
            Login
          </Link>
        </li>
      </Fragment>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="#">
              Suggestr
            </a>
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link to="/movies/questions/" className="nav-link">
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/tv/questions/" className="nav-link">
                  TV
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link to="/books/questions/" className="nav-link">
                  Books
                </Link>
              </li> */}
              <li>
                <Link to="/saved_items/" className="nav-link">
                  Saved
                </Link>
              </li>
              {isAuthenticated ? authLinks : guestLinks}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
