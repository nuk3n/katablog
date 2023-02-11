/* eslint-disable */
import ArticlesList from './articles-list';
import './app-body.scss';
import Pagination from './pagination';
import ArticleFull from './article-full';

function AppBody() {
  return (
    <div className="appBody">
      {/*<ArticleFull />*/}
      <ArticlesList />
      <Pagination />
    </div>
  );
}

export default AppBody;
