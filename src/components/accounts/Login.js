import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login, socialLoginAction } from '../../actions/auth';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.socialResponse = this.socialResponse.bind(this);
  }

  static propTypes = {
    login: PropTypes.func.isRequired,
    socialLoginAction: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  socialResponse(response, social_name) {
    this.props.socialLoginAction(response['accessToken'], social_name);
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username, password } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Login</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={this.onChange}
                value={username}
              />
            </div>

            <div className="form-group">
              <label>Password (must contain a capital letter and numbers)</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary" style={{cursor: 'pointer'}}>
                Login
              </button>
            </div>

            <div className="d-flex justify-content-around small">
              <FacebookLogin
                textButton="FACEBOOK LOGIN"
                appId="984527635392710"
                fields="name,email,picture"
                callback={(response) => this.socialResponse(response, 'facebook')}
              />
              <GoogleLogin
                clientId="661658316709-58s5haboog98sorttfmdosv6b65rgii6.apps.googleusercontent.com"
                buttonText="GOOGLE LOGIN"
                onSuccess={(response) => this.socialResponse(response, 'google')}
                onFailure={(response) => this.socialResponse(response, 'google')}
                cookiePolicy={'single_host_origin'}
              />
            </div>

            <p className="form-group">
              <br />
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, socialLoginAction })(Login);
