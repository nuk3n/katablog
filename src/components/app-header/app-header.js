import './app-header.scss';
import { Link } from 'react-router-dom';

function AppHeader() {
  return (
    <div className="appHeader">
      <Link to="/" className="appHeader__blogTitle">
        Realworld Blog
      </Link>
      <div className="appHeader__sighButtons">
        <button type="button" className="appHeader__signInButton">
          Sign in
        </button>
        <button type="button" className="appHeader__signUpButton">
          Sign up
        </button>
      </div>
    </div>
  );
}

export default AppHeader;
