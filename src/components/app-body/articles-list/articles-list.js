import ArticleShort from '../article-short';
import './articles-list.scss';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import { useEffect } from 'react';

function ArticlesList({ getArticles, articles }) {
  useEffect(() => {
    getArticles();
  }, [getArticles]);

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
  articles: state.articles,
});

export default connect(mapStateToProps, actions)(ArticlesList);
