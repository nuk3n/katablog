import ArticleShort from '../article-short';
import './articles-list.scss';
import * as actions from '../../../store/actions';
import LoadingIndicator from '../../loadingIndicator';
import ErrorAlert from '../../errorAlert';
import { connect } from 'react-redux';
import { useEffect } from 'react';

function ArticlesList({ getArticles, articles, status }) {
  useEffect(() => {
    getArticles();
  }, [getArticles]);

  if (status === 'loading') return <LoadingIndicator />;
  if (status === 'error') return <ErrorAlert />;

  const articlesList = articles.map((article) => (
    <li key={article.slug}>
      <ArticleShort articleInfo={article} />
    </li>
  ));

  return (
    <div className="appBody__articleListWrapper">
      <ul className="appBody__articleList">{articlesList}</ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  status: state.status,
  articles: state.articles,
});

export default connect(mapStateToProps, actions)(ArticlesList);
