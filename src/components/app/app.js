import AppHeader from '../app-header';
import './app.scss';
import ArticlesList from '../app-body/articles-list';
import ArticleFull from '../app-body/article-full';
import SignUpPage from '../sign-up-page';
import SignInPage from '../sign-in-page';
import EditProfilePage from '../edit-profile-page';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app">
        <Route path="/" component={AppHeader} />
        <Route path="/" component={ArticlesList} exact />
        <Route
          path="/articles/:slug"
          render={({ match }) => {
            const { slug } = match.params;
            return <ArticleFull slug={slug} />;
          }}
        />
        <Route path="/sign-up" component={SignUpPage} />
        <Route path="/sign-in" component={SignInPage} />
        <Route path="/profile" component={EditProfilePage} />
      </div>
    </Router>
  );
}

export default App;
