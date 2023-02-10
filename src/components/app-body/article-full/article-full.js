/* eslint-disable */
import * as actions from '../../../store/actions';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ArticleShort from '../article-short';

function ArticleFull({ getArticle }) {
  const [article, setArticle] = useState({});

  useEffect(() => {
    getArticle('qweqwe-8vk6hy').then((art) => setArticle(art));
  }, []);

  // const {
  //   title,
  //   favoritesCount,
  //   description,
  //   tagList,
  //   createdAt,
  //   // author: { username, image },
  // } = article;

  return (
    <div className="articleFull">
      {/*<ArticleShort articleInfo={article} />*/}
      {JSON.stringify(article)}
      {JSON.stringify(article.author.username)}
    </div>
  );
}

export default connect(null, actions)(ArticleFull);
