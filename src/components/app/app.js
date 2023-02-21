import AppHeader from '../app-header';
import './app.scss';
import ArticlesList from '../articles-list';
import ArticleFull from '../article-full';
import SignUpPage from '../sign-up-page';
import SignInPage from '../sign-in-page';
import EditProfilePage from '../edit-profile-page';
import * as actions from '../../store/actions';
import EditArticlePage from '../editArticlePage';
import CreateArticlePage from '../create-article-page';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';

function App({ checkUser }) {
  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkUser();
    }
  });
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <Switch>
          <Route
            path="/articles/:slug"
            render={({ match }) => {
              const { slug } = match.params;
              return <ArticleFull slug={slug} />;
            }}
            exact
          />
          <Route path="/sign-up" component={SignUpPage} />
          <Route path="/sign-in" component={SignInPage} />
          <Route path="/profile" component={EditProfilePage} />
          <Route path="/new-article" component={CreateArticlePage} />
          <Route
            path="/articles/:slug/edit"
            render={({ match }) => {
              const { slug } = match.params;
              return <EditArticlePage slug={slug} />;
            }}
          />
          <Route
            path="/:page?"
            render={({ match }) => {
              const { page } = match.params;
              return <ArticlesList page={page} />;
            }}
            exact
          />
          <Redirect to="/" />
        </Switch>
      </div>
      <ToastContainer
        position="top-center"
        hideProgressBar
        pauseOnHover={false}
        theme="colored"
        style={{ width: '250px' }}
      />
    </Router>
  );
}

export default connect(null, actions)(App);
