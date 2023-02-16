import './app-header.scss';
import defaultPic from '../../icons/profile.png';
import * as actions from '../../store/actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function AppHeader({ userData, isLoggedIn, setIsLoggedIn }) {
  if (isLoggedIn) {
    const logOut = () => {
      localStorage.removeItem('user');
      setIsLoggedIn(false);
    };
    const { username, image } = userData;
    return (
      <div className="appHeader">
        <Link to="/" className="appHeader__blogTitle">
          Realworld Blog
        </Link>
        <div className="appHeader__loggedInMenu">
          <Link to="/" className="appHeader__createArticle">
            Create article
          </Link>
          <Link to="/profile" className="appHeader__profileInfo">
            <span className="appHeader__profileName">{username}</span>
            <img src={image || defaultPic} alt="profile pic" className="appHeader__profilePic" />
          </Link>
          <Link to="/" className="appHeader__logOut" onClick={logOut}>
            Log Out
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="appHeader">
      <Link to="/" className="appHeader__blogTitle">
        Realworld Blog
      </Link>
      <div className="appHeader__sighLinks">
        <Link to="/sign-in" className="appHeader__signInLink">
          Sign in
        </Link>
        <Link to="/sign-up" className="appHeader__signUpLink">
          Sign up
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
  userData: state.userData,
});

export default connect(mapStateToProps, actions)(AppHeader);
