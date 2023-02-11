import AppHeader from '../app-header';
import './app.scss';
import ArticlesList from '../app-body/articles-list';
import ArticleFull from '../app-body/article-full';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app">
        <Route path="/" component={AppHeader} />
        <Route path="/" component={ArticlesList} exact />
        <Route path="/articles/" component={ArticlesList} exact />
        <Route
          path="/articles/:slug"
          render={({ match }) => {
            const { slug } = match.params;
            return <ArticleFull slug={slug} />;
          }}
        />
      </div>
    </Router>
  );
}

export default App;
