import AppHeader from '../app-header';
import './app.scss';
import routes from '../routes';
import ArticlesList from '../articles-list';
import ArticleFull from '../article-full';
import SignUpPage from '../sign-up-page';
import SignInPage from '../sign-in-page';
import EditProfilePage from '../edit-profile-page';
import * as actions from '../../store/actions';
import EditArticlePage from '../editArticlePage';
import CreateArticlePage from '../create-article-page';
import { getToken } from '../../store/local-storage-API';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';

function App({ checkUser }) {
  useEffect(() => {
    if (getToken()) {
      checkUser();
    }
  });
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <Switch>
          <Route
            path={routes.article}
            render={({ match }) => {
              const { slug } = match.params;
              return <ArticleFull slug={slug} />;
            }}
            exact
          />
          <Route path={routes.signUp} component={SignUpPage} />
          <Route path={routes.signIn} component={SignInPage} />
          <Route path={routes.profile} component={EditProfilePage} />
          <Route path={routes.newArticle} component={CreateArticlePage} />
          <Route
            path={routes.editArticle}
            render={({ match }) => {
              const { slug } = match.params;
              return <EditArticlePage slug={slug} />;
            }}
          />
          <Route
            path={`${routes.base}:page?`}
            render={({ match }) => {
              const { page } = match.params;
              return <ArticlesList page={page} />;
            }}
            exact
          />
          <Redirect to={routes.base} />
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
