import './app-header.scss';

function AppHeader() {
  return (
    <div className="appHeader">
      <div className="appHeader__blogTitle">Realworld Blog</div>
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
